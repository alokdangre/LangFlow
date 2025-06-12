from fastapi import FastAPI, Query
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain.chat_models import init_chat_model
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

llm = init_chat_model(
    model_provider="google_genai",
    model="gemini-2.0-flash",
    api_key=os.getenv("GOOGLE_API_KEY"),
)

class State(TypedDict):
    messages: Annotated[list, add_messages]

@app.get('/')
def root():
    return {"status": "Server is up and running"}

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}

def chat_node(state: State):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

graph_builder = StateGraph(State)

graph_builder.add_node("chat_node",chat_node)
graph_builder.add_edge(START, "chat_node")
graph_builder.add_edge("chat_node", END)

graph = graph_builder.compile()

def main(query):

    result = graph.invoke({"messages": [{"role": "user", "content": query}]})
    print(result['messages'])
    return result

@app.post("/api/chat")
def chat(
    query: str = Query(..., description="Chat Message")
):
    response = main(query=query)
    return {"query": response['messages'][0].content,"result": response['messages'][1].content}
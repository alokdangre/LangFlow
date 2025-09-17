#!/bin/bash

# Build script for hooks server
set -e

echo "🏗️  Building LangFlow Hooks Server..."

# Build Docker image
echo "📦 Building Docker image..."
docker build -t langflow-hooks:latest .

echo "✅ Build completed successfully!"
echo ""
echo "🚀 To run locally:"
echo "   docker run -p 3001:3001 --env-file .env langflow-hooks:latest"
echo ""
echo "🐳 To run with docker-compose:"
echo "   docker-compose up"

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import { workflowEngine } from './workflow-engine';
import nodemailer from "nodemailer";

const app = express();
const client = new PrismaClient();

app.use(express.json());

// Test database connection
async function testDatabaseConnection() {
    try {
        await client.$connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

// Generate a unique webhook URL for a workflow
function generateWebhookUrl(userId: string, workflowId: string): string {
    const baseUrl = process.env.WEBHOOK_BASE_URL || `http://localhost:3001`;
    return `${baseUrl}/hooks/catch/${userId}/${workflowId}`;
}

// Create a new workflow with webhook trigger
app.post("/workflows", async (req: Request, res: Response) => {
    const { name, description, userId, actions } = req.body;

    if (!name || !userId) {
        return res.status(400).json({ error: "Name and userId are required" });
    }

    try {
        const result = await client.$transaction(async (tx) => {
            // Create workflow
            const workflow = await tx.workflow.create({
                data: {
                    name,
                    description,
                    userId: userId,
                    triggerId: "webhook", // Default webhook trigger
                    webhookUrl: "", // Will be updated after creation
                }
            });

            // Generate webhook URL
            const webhookUrl = generateWebhookUrl(workflow.userId, workflow.id);

            // Update workflow with webhook URL
            const updatedWorkflow = await tx.workflow.update({
                where: { id: workflow.id },
                data: { webhookUrl }
            });

            // Create webhook trigger
            const trigger = await tx.trigger.create({
                data: {
                    workflowId: workflow.id,
                    triggerId: "webhook-trigger",
                    webhookUrl,
                    metadata: { type: "webhook" }
                }
            });

            // Create actions if provided
            if (actions && Array.isArray(actions)) {
                for (let i = 0; i < actions.length; i++) {
                    const action = actions[i];
                    await tx.action.create({
                        data: {
                            workflowId: workflow.id,
                            actionId: action.actionId,
                            metadata: action.metadata || {},
                            sortingOrder: i
                        }
                    });
                }
            }

            return { workflow: updatedWorkflow, trigger };
        });

        res.status(201).json({
            message: "Workflow created successfully",
            workflow: result.workflow,
            webhookUrl: result.workflow.webhookUrl
        });

    } catch (error) {
        console.error("Error creating workflow:", error);
        res.status(500).json({ 
            error: "Failed to create workflow",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// List workflows by user
app.get("/workflows/user/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const workflows = await client.workflow.findMany({
            where: { userId: userId },
            include: {
                trigger: true,
                actions: {
                    orderBy: { sortingOrder: 'asc' }
                },
                workflowExecutions: {
                    take: 5,
                    orderBy: { id: 'desc' }
                }
            }
        });

        res.json({ workflows });
    } catch (error) {
        console.error("Error fetching workflows:", error);
        res.status(500).json({ 
            error: "Failed to fetch workflows",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Get workflow by ID
app.get("/workflows/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const workflow = await client.workflow.findUnique({
            where: { id },
            include: {
                trigger: true,
                actions: {
                    orderBy: { sortingOrder: 'asc' }
                },
                workflowExecutions: {
                    take: 10,
                    orderBy: { id: 'desc' }
                }
            }
        });

        if (!workflow) {
            return res.status(404).json({ error: "Workflow not found" });
        }

        res.json({ workflow });
    } catch (error) {
        console.error("Error fetching workflow:", error);
        res.status(500).json({ 
            error: "Failed to fetch workflow",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Update workflow
app.put("/workflows/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, isActive, actions } = req.body;

    try {
        const result = await client.$transaction(async (tx) => {
            // Update workflow
            const workflow = await tx.workflow.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(description !== undefined && { description }),
                    ...(isActive !== undefined && { isActive }),
                    updatedAt: new Date()
                }
            });

            // Update actions if provided
            if (actions && Array.isArray(actions)) {
                // Delete existing actions
                await tx.action.deleteMany({
                    where: { workflowId: id }
                });

                // Create new actions
                for (let i = 0; i < actions.length; i++) {
                    const action = actions[i];
                    await tx.action.create({
                        data: {
                            workflowId: id,
                            actionId: action.actionId,
                            metadata: action.metadata || {},
                            sortingOrder: i
                        }
                    });
                }
            }

            return workflow;
        });

        res.json({
            message: "Workflow updated successfully",
            workflow: result
        });

    } catch (error) {
        console.error("Error updating workflow:", error);
        res.status(500).json({ 
            error: "Failed to update workflow",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Delete workflow
app.delete("/workflows/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await client.$transaction(async (tx) => {
            // Delete related records first
            await tx.action.deleteMany({ where: { workflowId: id } });
            await tx.trigger.deleteMany({ where: { workflowId: id } });
            await tx.workflowExecution.deleteMany({ where: { workflowId: id } });
            
            // Delete workflow
            await tx.workflow.delete({ where: { id } });
        });

        res.json({ message: "Workflow deleted successfully" });
    } catch (error) {
        console.error("Error deleting workflow:", error);
        res.status(500).json({ 
            error: "Failed to delete workflow",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// List available triggers
app.get("/triggers", async (req: Request, res: Response) => {
    try {
        const triggers = await client.availableTrigger.findMany();
        res.json({ triggers });
    } catch (error) {
        console.error("Error fetching available triggers:", error);
        res.status(500).json({ 
            error: "Failed to fetch available triggers",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// List available actions
app.get("/actions", async (req: Request, res: Response) => {
    try {
        const actions = await client.availableAction.findMany();
        res.json({ actions });
    } catch (error) {
        console.error("Error fetching available actions:", error);
        res.status(500).json({ 
            error: "Failed to fetch available actions",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Create available trigger
app.post("/triggers", async (req: Request, res: Response) => {
    const { name, image } = req.body;

    if (!name || !image) {
        return res.status(400).json({ error: "Name and image are required" });
    }

    try {
        const trigger = await client.availableTrigger.create({
            data: { name, image }
        });

        res.status(201).json({
            message: "Available trigger created successfully",
            trigger
        });
    } catch (error) {
        console.error("Error creating available trigger:", error);
        res.status(500).json({ 
            error: "Failed to create available trigger",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Create available action
app.post("/actions", async (req: Request, res: Response) => {
    const { name, image } = req.body;

    if (!name || !image) {
        return res.status(400).json({ error: "Name and image are required" });
    }

    try {
        const action = await client.availableAction.create({
            data: { name, image }
        });

        res.status(201).json({
            message: "Available action created successfully",
            action
        });
    } catch (error) {
        console.error("Error creating available action:", error);
        res.status(500).json({ 
            error: "Failed to create available action",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Initialize default triggers and actions
app.post("/initialize-defaults", async (req: Request, res: Response) => {
    try {
        await client.$transaction(async (tx) => {
            // Create default triggers
            const defaultTriggers = [
                { name: "Webhook", image: "🔗" },
                { name: "Schedule", image: "⏰" },
                { name: "Email Received", image: "📧" }
            ];

            for (const trigger of defaultTriggers) {
                await tx.availableTrigger.upsert({
                    where: { name: trigger.name },
                    update: {},
                    create: trigger
                });
            }

            // Create default actions
            const defaultActions = [
                { name: "Send Email", image: "📧" },
                { name: "Send Slack Message", image: "💬" },
                { name: "HTTP Request", image: "🌐" },
                { name: "Create Database Record", image: "💾" },
                { name: "Send SMS", image: "📱" }
            ];

            for (const action of defaultActions) {
                await tx.availableAction.upsert({
                    where: { name: action.name },
                    update: {},
                    create: action
                });
            }
        });

        res.json({ message: "Default triggers and actions initialized successfully" });
    } catch (error) {
        console.error("Error initializing defaults:", error);
        res.status(500).json({ 
            error: "Failed to initialize defaults",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Gmail OAuth setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
);

// Gmail OAuth authorization URL
app.get("/auth/gmail", async (req: Request, res: Response) => {
    const { userId } = req.query;
    
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }

    const scopes = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/userinfo.email'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: userId.toString() // Pass userId in state for callback
    });

    res.json({ authUrl });
});

// Gmail OAuth callback
app.get("/auth/gmail/callback", async (req: Request, res: Response) => {
    const { code, state } = req.query;
    const userId = state;

    if (!code || !userId) {
        return res.status(400).json({ error: "Authorization code and userId are required" });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code as string);
        
        // Store tokens in database (you might want to encrypt these)
        await client.user.update({
            where: { id: userId as string },
            data: {
                // Add these fields to your User model
                gmailAccessToken: tokens.access_token,
                gmailRefreshToken: tokens.refresh_token,
            }
        });

        res.json({ message: "Gmail authorization successful" });
    } catch (error) {
        console.error("Error getting Gmail tokens:", error);
        res.status(500).json({ error: "Failed to authorize Gmail access" });
    }
});

// Send Gmail endpoint
app.post("/actions/send-gmail", async (req: Request, res: Response) => {
    const { userId, to, subject, body, html } = req.body;

    if (!userId || !to || !subject || !body) {
        return res.status(400).json({ 
            error: "userId, to, subject, and body are required" 
        });
    }

    try {
        // Get user's Gmail tokens from database
        const user = await client.user.findUnique({
            where: { id: userId }
        });

        if (!user || !user.gmailAccessToken) {
            return res.status(401).json({ 
                error: "Gmail not authorized. Please authorize Gmail access first.",
                authRequired: true
            });
        }

        // Set up OAuth2 client with user's tokens
        oauth2Client.setCredentials({
            access_token: user.gmailAccessToken,
            refresh_token: user.gmailRefreshToken,
        });

        // Create Gmail API instance
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        // Create email message
        const emailLines = [
            `To: ${to}`,
            `Subject: ${subject}`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            '',
            html || body
        ];

        const email = emailLines.join('\n');
        const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        // Send email
        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedEmail,
            },
        });

        res.json({
            message: "Email sent successfully",
            messageId: result.data.id,
            to,
            subject
        });

    } catch (error: any) {
        console.error("Error sending Gmail:", error);
        
        // Handle specific Gmail API errors
        if (error.code === 401) {
            return res.status(401).json({ 
                error: "Gmail authorization expired. Please re-authorize.",
                needsReauth: true 
            });
        }

        res.status(500).json({ 
            error: "Failed to send email",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Check Gmail authorization status
app.get("/auth/gmail/status/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await client.user.findUnique({
            where: { id: userId },
            select: { gmailAccessToken: true }
        });

        res.json({
            authorized: !!user?.gmailAccessToken,
            userId: userId
        });
    } catch (error) {
        console.error("Error checking Gmail status:", error);
        res.status(500).json({ error: "Failed to check Gmail authorization status" });
    }
});

// Webhook receiver endpoint
app.post("/hooks/catch/:userId/:workflowId", async (req: Request, res: Response) => {
    const { userId, workflowId } = req.params;
    const webhookData = req.body;

    try {
        await client.$transaction(async (tx) => {
            // Verify workflow exists and belongs to user
            const workflow = await tx.workflow.findFirst({
                where: {
                    id: workflowId,
                    userId: userId
                }
            });

            if (!workflow) {
                throw new Error("Workflow not found or access denied");
            }

            // Create workflow execution record
            const execution = await tx.workflowExecution.create({
                data: {
                    workflowId: workflowId,
                    metadata: webhookData,
                    status: "running"
                }
            });

            console.log(`Created workflow execution: ${execution.id}`);

            // Execute the workflow asynchronously
            setImmediate(async () => {
                try {
                    await workflowEngine.executeWorkflow({
                        workflowId,
                        executionId: execution.id,
                        triggerData: webhookData,
                        userId: userId
                    });
                } catch (error) {
                    console.error(`Workflow execution failed: ${execution.id}`, error);
                }
            });
        });

        res.json({ 
            message: "Webhook received and workflow execution started",
            workflowId,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Webhook processing error:", error);
        res.status(500).json({ 
            error: "Failed to process webhook",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;

// Start server with proper async initialization
async function startServer() {
    try {
        await testDatabaseConnection();
        
        app.listen(PORT, () => {
            console.log(`🚀 Hooks server running on port ${PORT}`);
            console.log(`📡 Webhook endpoint: http://localhost:${PORT}/hooks/catch/:userId/:workflowId`);
        });

        // Keep the process alive
        process.on('SIGTERM', () => {
            console.log('🛑 Received SIGTERM, shutting down gracefully');
            client.$disconnect();
            process.exit(0);
        });

        process.on('SIGINT', () => {
            console.log('🛑 Received SIGINT, shutting down gracefully');
            client.$disconnect();
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
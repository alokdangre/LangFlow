# LangFlow - AI Workflow Automation Platform

A comprehensive n8n.io clone built with Next.js, featuring user authentication, workspace management, pricing tiers, and advanced workflow automation capabilities.

## Features

### 🔐 Authentication & User Management
- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional authentication method
- **User Roles**: Admin, User, and Super Admin roles
- **Profile Management**: Complete user profile system

### 💼 Workspace Management
- **Multi-tenant Architecture**: Isolated workspaces for teams
- **Role-based Access Control**: Owner, Admin, Member, and Viewer roles
- **Team Collaboration**: Invite and manage team members
- **Workspace Settings**: Customizable workspace configurations

### 💰 Pricing & Billing
- **Stripe Integration**: Secure payment processing
- **Multiple Plans**: Free, Starter, Pro, and Enterprise tiers
- **Subscription Management**: Automatic billing and plan upgrades
- **Usage Tracking**: Monitor executions, API calls, and storage

### 🔄 Workflow Automation
- **Visual Editor**: Drag-and-drop workflow builder
- **Node System**: Extensible node architecture
- **Real-time Execution**: Live workflow monitoring
- **Version Control**: Workflow versioning and rollback
- **Templates**: Pre-built workflow templates

### 📊 Analytics & Monitoring
- **Execution Tracking**: Detailed workflow execution logs
- **Performance Metrics**: Execution time and success rates
- **Usage Analytics**: Resource consumption monitoring
- **Error Handling**: Comprehensive error tracking

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **UI**: Tailwind CSS, Lucide Icons
- **Workflow Engine**: ReactFlow
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/langflow.git
   cd langflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/langflow"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stripe
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # OpenAI (for AI nodes)
   OPENAI_API_KEY="sk-..."
   
   # App Configuration
   APP_URL="http://localhost:3000"
   APP_NAME="LangFlow"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: User accounts with authentication and subscription info
- **Workspaces**: Multi-tenant workspace system
- **Workflows**: Workflow definitions with nodes and edges
- **Executions**: Workflow execution history and results
- **Templates**: Reusable workflow templates
- **Usage**: Resource usage tracking for billing

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handlers

### Workspaces
- `GET /api/workspaces` - List user workspaces
- `POST /api/workspaces` - Create new workspace

### Workflows
- `GET /api/workflows` - List workflows
- `POST /api/workflows` - Create new workflow

### Payments
- `POST /api/stripe/create-checkout-session` - Create Stripe checkout
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables** in Vercel dashboard

3. **Configure Stripe webhooks** to point to your deployed URL

### Docker

1. **Build the image**
   ```bash
   docker build -t langflow .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 langflow
   ```

## Configuration

### Stripe Setup

1. Create products and prices in Stripe Dashboard
2. Update price IDs in `src/app/pricing/page.tsx`
3. Configure webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
4. Add webhook events: `checkout.session.completed`, `customer.subscription.updated`, etc.

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@langflow.com
- 💬 Discord: [Join our community](https://discord.gg/langflow)
- 📖 Documentation: [docs.langflow.com](https://docs.langflow.com)

## Roadmap

- [ ] Advanced node types (HTTP, Database, etc.)
- [ ] Workflow scheduling and cron jobs
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Enterprise SSO integration
- [ ] Custom node development SDK
- [ ] Workflow marketplace

---

Built with ❤️ by the LangFlow team

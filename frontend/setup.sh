#!/bin/bash

# LangFlow Setup Script
echo "🚀 Setting up LangFlow - AI Workflow Automation Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration before proceeding."
    echo "   Required variables:"
    echo "   - DATABASE_URL (PostgreSQL connection string)"
    echo "   - NEXTAUTH_SECRET (random secret key)"
    echo "   - STRIPE_* (Stripe API keys for payments)"
    echo "   - GOOGLE_* (Google OAuth credentials - optional)"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check if database is accessible
echo "🗄️  Checking database connection..."
if npx prisma db push --accept-data-loss 2>/dev/null; then
    echo "✅ Database connected and schema updated"
else
    echo "❌ Database connection failed. Please check your DATABASE_URL in .env"
    echo "   Make sure PostgreSQL is running and accessible."
    exit 1
fi

# Create initial admin user (optional)
echo ""
read -p "Would you like to create an admin user? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter admin email: " ADMIN_EMAIL
    read -s -p "Enter admin password: " ADMIN_PASSWORD
    echo
    
    # You would need to create a script to add admin user
    echo "ℹ️  Admin user creation would be implemented here"
    echo "   For now, please sign up through the web interface"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Sign up for a new account or sign in"
echo ""
echo "For production deployment:"
echo "- Vercel: npm run build && vercel"
echo "- Docker: docker-compose up --build"
echo ""
echo "Need help? Check out:"
echo "- README.md for detailed documentation"
echo "- GitHub Issues for support"
echo ""
echo "Happy workflow building! 🔄✨"

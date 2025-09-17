#!/bin/bash

# Production deployment script
set -e

echo "🚀 Deploying LangFlow Hooks Server to Production..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please create one with required environment variables."
    exit 1
fi

# Build and deploy
echo "📦 Building production image..."
docker-compose -f docker-compose.prod.yml build

echo "🔄 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

echo "🚀 Starting production containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "⏳ Waiting for service to be ready..."
sleep 10

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ Deployment successful! Service is healthy."
    echo "🌐 Hooks server is running at: http://localhost:3001"
else
    echo "❌ Health check failed. Checking logs..."
    docker-compose -f docker-compose.prod.yml logs hooks-server
    exit 1
fi

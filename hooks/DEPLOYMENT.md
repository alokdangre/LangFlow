# LangFlow Hooks Server - Docker Deployment Guide

## 🐳 Docker Production Deployment

### Prerequisites
- Docker and Docker Compose installed
- Environment variables configured
- PostgreSQL database accessible

### Quick Start

1. **Clone and navigate to hooks directory**
   ```bash
   cd hooks/
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Build and deploy**
   ```bash
   ./scripts/build.sh
   ./scripts/deploy.sh
   ```

### Environment Variables

Create a `.env` file with these required variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Gmail OAuth
GMAIL_CLIENT_ID="your-gmail-client-id"
GMAIL_CLIENT_SECRET="your-gmail-client-secret"
GMAIL_REDIRECT_URI="https://your-domain.com/auth/gmail/callback"

# Server Configuration
NODE_ENV="production"
PORT=3001
WEBHOOK_BASE_URL="https://your-domain.com"
```

### Deployment Options

#### Option 1: Docker Compose (Recommended)
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f hooks-server

# Stop
docker-compose -f docker-compose.prod.yml down
```

#### Option 2: Docker Run
```bash
# Build image
docker build -t langflow-hooks .

# Run container
docker run -d \
  --name langflow-hooks \
  -p 3001:3001 \
  --env-file .env \
  --restart unless-stopped \
  langflow-hooks:latest
```

#### Option 3: Railway with Docker
1. Connect your Railway project to this repository
2. Set Railway to use Dockerfile deployment
3. Configure environment variables in Railway dashboard
4. Deploy!

### Health Checks

The container includes built-in health checks:

```bash
# Check if service is healthy
curl http://localhost:3001/health

# Expected response
{
  "status": "OK",
  "timestamp": "2025-09-17T12:00:00.000Z",
  "port": 3001,
  "env": "production"
}
```

### Monitoring and Logs

```bash
# View real-time logs
docker-compose -f docker-compose.prod.yml logs -f hooks-server

# Check container status
docker-compose -f docker-compose.prod.yml ps

# Restart service
docker-compose -f docker-compose.prod.yml restart hooks-server
```

### Troubleshooting

#### Container won't start
1. Check logs: `docker-compose logs hooks-server`
2. Verify environment variables are set
3. Ensure database is accessible
4. Check port conflicts

#### Database connection issues
1. Verify `DATABASE_URL` format
2. Check database server accessibility
3. Ensure Prisma migrations are applied

#### Port binding issues
1. Check if port 3001 is available
2. Modify port mapping in docker-compose.yml
3. Update firewall rules if needed

### Production Considerations

1. **Reverse Proxy**: Use Nginx or similar for SSL termination
2. **Database**: Use managed PostgreSQL service
3. **Monitoring**: Add logging and monitoring solutions
4. **Backups**: Regular database backups
5. **Security**: Keep dependencies updated

### Railway Migration

If migrating from Railway to Docker:

1. Export environment variables from Railway
2. Create `.env` file with these variables
3. Deploy using Docker Compose
4. Update frontend `BACKEND_URL` to point to new Docker deployment
5. Test all endpoints

### Performance Tuning

For production workloads:

```yaml
# In docker-compose.prod.yml
services:
  hooks-server:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

## 🚀 Ready to Deploy!

Your hooks server is now containerized and ready for production deployment with:
- ✅ Multi-stage Docker build for optimization
- ✅ Health checks and monitoring
- ✅ Production-ready configuration
- ✅ Easy deployment scripts
- ✅ Comprehensive logging

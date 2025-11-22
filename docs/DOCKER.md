# Docker Setup - Bank Saving System

## Dockerfiles Created

This project now includes Dockerfiles for both backend and frontend using `node:22-alpine` as the base image.

### Backend Dockerfile

**Location:** `backend/Dockerfile`

**Features:**
- Uses `node:22-alpine` for minimal image size
- Production-ready with `npm ci --only=production`
- Exposes port 5000
- Runs with `node src/index.js`

**Build & Run:**
```bash
cd backend

# Build image
docker build -t bank-saving-system-backend .

# Run container
docker run -p 5000:5000 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  bank-saving-system-backend
```

---

### Frontend Dockerfile

**Location:** `frontend/Dockerfile`

**Features:**
- Multi-stage build for optimized production image
- Build stage: Compiles React app with Vite
- Production stage: Serves static files with `serve`
- Uses `node:22-alpine` for both stages
- Exposes port 3000

**Build & Run:**
```bash
cd frontend

# Build image
docker build -t bank-saving-system-frontend .

# Run container
docker run -p 3000:3000 bank-saving-system-frontend
```

---

## Docker Compose (Optional)

Create `docker-compose.yml` in root to run everything together:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: bank_saving_system
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/bank_saving_system
      PORT: 5000
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Run with Docker Compose:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## Image Sizes

Approximate image sizes using `node:22-alpine`:

- **Backend**: ~150MB
- **Frontend**: ~50MB (after multi-stage build)

---

## Environment Variables

### Backend
Required environment variables for the backend container:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PORT` | Server port (default: 5000) | `5000` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend
The frontend is a static build and doesn't require environment variables at runtime. API URL should be configured during build time.

---

## Production Deployment

### Using Docker

```bash
# Build images
docker build -t yourusername/bank-system-backend:latest ./backend
docker build -t yourusername/bank-system-frontend:latest ./frontend

# Push to registry
docker push yourusername/bank-system-backend:latest
docker push yourusername/bank-system-frontend:latest

# Run on server
docker pull yourusername/bank-system-backend:latest
docker pull yourusername/bank-system-frontend:latest
docker run -d -p 5000:5000 --name backend \
  -e DATABASE_URL=$DATABASE_URL \
  yourusername/bank-system-backend:latest
docker run -d -p 3000:3000 --name frontend \
  yourusername/bank-system-frontend:latest
```

### Using Docker Compose on Server

```bash
# On your server
git clone <repo-url>
cd bank-saving-system
docker-compose up -d
```

---

## Best Practices

✅ **Multi-stage builds** - Frontend uses multi-stage for smaller final image  
✅ **Alpine Linux** - Uses `node:22-alpine` for minimal size  
✅ **Production dependencies only** - Backend uses `npm ci --only=production`  
✅ **.dockerignore** - Excludes unnecessary files (node_modules, logs)  
✅ **Layer caching** - Package files copied before source code for better caching  

---

## Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure PostgreSQL is accessible
- Check logs: `docker logs <container-id>`

### Frontend shows errors
- Ensure backend is running and accessible
- Check API base URL in frontend code
- Verify build completed successfully

### Database connection fails
- Check network connectivity
- Use Docker network for inter-container communication
- Verify credentials

---

## Next Steps

- [ ] Add health checks to Dockerfiles
- [ ] Implement CI/CD pipeline
- [ ] Add Kubernetes manifests
- [ ] Set up monitoring with Prometheus
- [ ] Configure NGINX reverse proxy

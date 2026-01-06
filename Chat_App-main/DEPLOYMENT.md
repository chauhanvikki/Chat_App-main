# Production Deployment Guide

## Environment Setup

### Local Development
- Backend: Uses `.env` file with `http://localhost:5173` frontend URL
- Frontend: Uses `.env` file with `http://localhost:3000` backend URL

### Production
- Backend: Uses `.env.production` file with your production frontend URL
- Frontend: Uses `.env.production` file with your production backend URL

## Quick Deployment

### Windows
```bash
deploy.bat
```

### Linux/Mac
```bash
chmod +x deploy.sh
./deploy.sh
```

## Manual Deployment Steps

### 1. Backend Deployment (Vercel/Railway/Heroku)

1. Update `backend/.env.production`:
   ```
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

2. Deploy backend to your hosting service
3. Note your backend URL

### 2. Frontend Deployment (Vercel/Netlify)

1. Update `frontend/.env.production`:
   ```
   VITE_BACKEND_URL=https://your-backend-domain.vercel.app
   ```

2. Build frontend:
   ```bash
   cd frontend
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service

### 3. Update CORS Settings

Make sure your backend CORS settings allow your production frontend domain.

## Environment Variables

### Backend (.env.production)
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Strong secret key for JWT tokens
- `FRONTEND_URL`: Your production frontend URL
- `PORT`: Server port (usually 3000)
- `NODE_ENV`: Set to "production"

### Frontend (.env.production)
- `VITE_BACKEND_URL`: Your production backend URL

## Security Checklist

- ✅ Strong JWT secret
- ✅ MongoDB Atlas IP whitelist configured
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ HTTPS enabled on production domains

## Hosting Recommendations

### Backend
- **Vercel**: Easy deployment with GitHub integration
- **Railway**: Great for Node.js apps
- **Heroku**: Classic choice with good documentation

### Frontend
- **Vercel**: Excellent for React apps
- **Netlify**: Great performance and features
- **GitHub Pages**: Free option for static sites

### Database
- **MongoDB Atlas**: Already configured ✅
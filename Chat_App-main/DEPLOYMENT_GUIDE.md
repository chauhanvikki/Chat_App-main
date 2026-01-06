# 🚀 Deployment Guide: Vercel + Render

## Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Chat App ready for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend on Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Click "New +" → "Web Service"

### 2.2 Connect Repository
1. Connect your GitHub repository
2. Select the repository with your chat app
3. Set these configurations:
   - **Name**: `chatapp-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Set Environment Variables
Add these in Render dashboard:
```
MONGODB_URI=mongodb+srv://singhvikki870_db_user:vikki@chatapp-main.eifyb5e.mongodb.net/chatapp
JWT_SECRET=chatapp_jwt_secret_key_2024_secure_random_string_abcd1234efgh5678
FRONTEND_URL=https://YOUR_FRONTEND_URL.vercel.app
PORT=3000
NODE_ENV=production
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://YOUR_APP_NAME.onrender.com`

## Step 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub account
3. Click "New Project"

### 3.2 Import Repository
1. Import your GitHub repository
2. Set these configurations:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables
Add in Vercel dashboard:
```
VITE_BACKEND_URL=https://YOUR_BACKEND_URL.onrender.com
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL: `https://YOUR_APP_NAME.vercel.app`

## Step 4: Update Backend with Frontend URL

### 4.1 Update Render Environment
1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://YOUR_APP_NAME.vercel.app
   ```
3. Redeploy the service

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test signup/signin functionality
3. Test chat features
4. Check browser console for errors

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Error**: Update FRONTEND_URL in Render
2. **Build Failed**: Check package.json scripts
3. **Database Connection**: Verify MongoDB URI
4. **Environment Variables**: Double-check all variables

### Render Logs:
- Check logs in Render dashboard for backend errors

### Vercel Logs:
- Check function logs in Vercel dashboard

## 📱 Your Live URLs
- **Frontend**: https://YOUR_APP_NAME.vercel.app
- **Backend**: https://YOUR_APP_NAME.onrender.com

## 🎉 Success!
Your chat application is now live and accessible worldwide!
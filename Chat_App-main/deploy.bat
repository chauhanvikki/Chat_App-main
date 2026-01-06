@echo off
echo 🚀 Starting production deployment...

REM Build frontend
echo 📦 Building frontend...
cd frontend
call npm run build
cd ..

REM Copy production environment files
echo ⚙️ Setting up production environment...
copy backend\.env.production backend\.env
copy frontend\.env.production frontend\.env

echo ✅ Production build complete!
echo 📋 Next steps:
echo 1. Deploy backend to your hosting service (Vercel, Railway, etc.)
echo 2. Deploy frontend build folder to your hosting service
echo 3. Update FRONTEND_URL in backend/.env.production with your frontend domain
echo 4. Update VITE_BACKEND_URL in frontend/.env.production with your backend domain

pause
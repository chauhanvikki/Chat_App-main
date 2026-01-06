@echo off
echo 🔄 Environment Switcher

echo.
echo Select environment:
echo 1. Local Development
echo 2. Production Deployment
echo.

set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo 🏠 Switching to LOCAL environment...
    copy backend\.env.local backend\.env 2>nul || echo MONGODB_URI=mongodb+srv://singhvikki870_db_user:vikki@chatapp-main.eifyb5e.mongodb.net/chatapp > backend\.env && echo JWT_SECRET=chatapp_jwt_secret_key_2024_secure_random_string_abcd1234efgh5678 >> backend\.env && echo FRONTEND_URL=http://localhost:5173 >> backend\.env && echo PORT=3000 >> backend\.env && echo NODE_ENV=development >> backend\.env
    copy frontend\.env.local frontend\.env 2>nul || echo VITE_BACKEND_URL=http://localhost:3000 > frontend\.env && echo VITE_NODE_ENV=development >> frontend\.env
    echo ✅ Local environment activated
    echo 📋 Backend: http://localhost:3000
    echo 📋 Frontend: http://localhost:5173
) else if "%choice%"=="2" (
    echo 🚀 Switching to PRODUCTION environment...
    copy backend\.env.production backend\.env
    copy frontend\.env.production frontend\.env
    echo ✅ Production environment activated
    echo 📋 Backend: https://chatapp-backend-0iwk.onrender.com
    echo 📋 Frontend: https://chat-app-main-black.vercel.app
) else (
    echo ❌ Invalid choice. Please run again.
)

echo.
pause
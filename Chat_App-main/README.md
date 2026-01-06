# 💬 Chat Application - MERN Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Socket.IO-4.7.5-black?style=for-the-badge&logo=socket.io" alt="Socket.IO">
</div>

<div align="center">
  <h3>🚀 <a href="https://chat-app-main-black.vercel.app">Live Demo</a> | 🔗 <a href="https://chatapp-backend-0iwk.onrender.com">API</a></h3>
</div>

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [Author](#-author)

## ✨ Features

### 🔐 **Authentication**
- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Form validation

### 💬 **Real-time Chat**
- Instant messaging with Socket.IO
- Group chat creation and management
- Real-time typing indicators
- Message notifications

### 👥 **User Management**
- User search functionality
- Profile management
- Online/offline status
- User avatars

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Professional gradient themes
- Smooth animations and transitions
- Mobile-friendly interface

### 🔧 **Additional Features**
- Redux state management
- Toast notifications
- Error handling
- Loading states
- Auto-environment detection

## 🛠 Tech Stack

### **Frontend**
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time communication
- **React Toastify** - Notifications
- **React Icons** - Icon library

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/chauhanvikki/chat-app.git
cd chat-app
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# Start backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_BACKEND_URL=http://localhost:3000" > .env
echo "VITE_NODE_ENV=development" >> .env

# Start frontend server
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

## ⚙️ Environment Setup

### Backend Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

### Frontend Environment Variables
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_NODE_ENV=development
```

### 🔄 Auto Environment Switching
The application automatically detects the environment:
- **Local Development**: Uses localhost URLs
- **Production**: Uses deployed URLs

Use the environment switcher:
```bash
# Windows
switch-env.bat

# Choose: 1 for Local, 2 for Production
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   ```
4. Deploy

### Deploy to Render (Backend)
1. Connect repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```
5. Deploy

## 📡 API Endpoints

### Authentication
```
POST /api/auth/signup    - Register new user
POST /api/auth/signin    - Login user
```

### Users
```
GET  /api/user           - Get all users
GET  /api/user/:id       - Get user by ID
```

### Chats
```
GET  /api/chat           - Get user chats
POST /api/chat           - Create new chat
PUT  /api/chat/:id       - Update chat
DELETE /api/chat/:id     - Delete chat
```

### Messages
```
GET  /api/message/:chatId - Get chat messages
POST /api/message        - Send new message
```

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── config/
│   │   └── jwtProvider.js
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── message.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── wrapAsync.js
│   ├── models/
│   │   ├── chat.js
│   │   ├── message.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── message.js
│   │   └── user.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   │   └── environment.js
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── DEPLOYMENT.md
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨💻 Author

**Vishvendra Singh**
- 📧 Email: [singhvikki870@gmail.com](mailto:singhvikki870@gmail.com)
- 📱 Contact: +91 8708405362
- 📍 Location: Jhajjar, Haryana - 124103
- 💼 LinkedIn: [vishvendra-singh](https://www.linkedin.com/in/vishvendra-singh-/)
- 🐱 GitHub: [chauhanvikki](https://github.com/chauhanvikki)
- 📷 Instagram: [chauhan_vikki__](https://www.instagram.com/chauhan_vikki__/)

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>Made with ❤️ by Vishvendra Singh</p>
</div>
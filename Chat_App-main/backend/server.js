const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Auto-detect environment and set appropriate URLs
const isProduction = process.env.NODE_ENV === 'production';
const frontendUrls = [
	process.env.FRONTEND_URL,
	"http://localhost:5173",
	"https://chat-app-main-black.vercel.app",
	"http://localhost:3000"
].filter(Boolean);

// Enhanced CORS configuration for both environments
const corsOptions = {
	origin: function (origin, callback) {
		// Allow requests with no origin (mobile apps, etc.)
		if (!origin) return callback(null, true);
		
		if (frontendUrls.includes(origin)) {
			callback(null, true);
		} else {
			console.log('CORS blocked origin:', origin);
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get("/health", (req, res) => {
	res.status(200).json({ 
		status: "OK", 
		environment: isProduction ? 'production' : 'development',
		timestamp: new Date().toISOString() 
	});
});

const PORT = process.env.PORT || 3000;

// All routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

// Connect to Database with better error handling
main()
	.then(() => console.log("✅ Database Connection established"))
	.catch((err) => {
		console.error("❌ Database connection failed:", err);
		if (isProduction) process.exit(1);
	});

async function main() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
}

// Root route
app.get("/", (req, res) => {
	res.json({
		message: "🚀 Chat Application Backend is running!",
		environment: isProduction ? 'production' : 'development',
		allowed_origins: frontendUrls,
		timestamp: new Date().toISOString()
	});
});

// All routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// Invalid routes
app.all("*", (req, res) => {
	res.status(404).json({ 
		error: "Route not found", 
		path: req.path,
		method: req.method 
	});
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
	console.error("Error:", err);
	const errorMessage = err.message || "Something went wrong!";
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({ 
		message: errorMessage,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	});
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
	console.log(`🚀 Server listening on port ${PORT}`);
	console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
	console.log(`🔗 Allowed Origins:`, frontendUrls);
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully');
	server.close(() => {
		console.log('Process terminated');
	});
});

// Socket.IO setup with enhanced configuration
const { Server } = require("socket.io");
const io = new Server(server, {
	pingTimeout: 60000,
	pingInterval: 25000,
	transports: ["websocket", "polling"],
	cors: corsOptions,
	allowEIO3: true
});

// Socket connection
io.on("connection", (socket) => {
	console.log("Connected to socket.io:", socket.id);

	// Join user and message send to client
	const setupHandler = (userId) => {
		if (!socket.hasJoined) {
			socket.join(userId);
			socket.hasJoined = true;
			console.log("User joined:", userId);
			socket.emit("connected");
		}
	};
	const newMessageHandler = (newMessageReceived) => {
		let chat = newMessageReceived?.chat;
		chat?.users.forEach((user) => {
			if (user._id === newMessageReceived.sender._id) return;
			console.log("Message received by:", user._id);
			socket.in(user._id).emit("message received", newMessageReceived);
		});
	};

	// Join a Chat Room and Typing effect
	const joinChatHandler = (room) => {
		if (socket.currentRoom) {
			if (socket.currentRoom === room) {
				console.log(`User already in Room: ${room}`);
				return;
			}
			socket.leave(socket.currentRoom);
			console.log(`User left Room: ${socket.currentRoom}`);
		}
		socket.join(room);
		socket.currentRoom = room;
		console.log("User joined Room:", room);
	};
	const typingHandler = (room) => {
		socket.in(room).emit("typing");
	};
	const stopTypingHandler = (room) => {
		socket.in(room).emit("stop typing");
	};

	// Clear, Delete and Create chat handlers
	const clearChatHandler = (chatId) => {
		socket.in(chatId).emit("clear chat", chatId);
	};
	const deleteChatHandler = (chat, authUserId) => {
		chat.users.forEach((user) => {
			if (authUserId === user._id) return;
			console.log("Chat delete:", user._id);
			socket.in(user._id).emit("delete chat", chat._id);
		});
	};
	const chatCreateChatHandler = (chat, authUserId) => {
		chat.users.forEach((user) => {
			if (authUserId === user._id) return;
			console.log("Create chat:", user._id);
			socket.in(user._id).emit("chat created", chat);
		});
	};

	socket.on("setup", setupHandler);
	socket.on("new message", newMessageHandler);
	socket.on("join chat", joinChatHandler);
	socket.on("typing", typingHandler);
	socket.on("stop typing", stopTypingHandler);
	socket.on("clear chat", clearChatHandler);
	socket.on("delete chat", deleteChatHandler);
	socket.on("chat created", chatCreateChatHandler);

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
		socket.off("setup", setupHandler);
		socket.off("new message", newMessageHandler);
		socket.off("join chat", joinChatHandler);
		socket.off("typing", typingHandler);
		socket.off("stop typing", stopTypingHandler);
		socket.off("clear chat", clearChatHandler);
		socket.off("delete chat", deleteChatHandler);
		socket.off("chat created", chatCreateChatHandler);
	});
});

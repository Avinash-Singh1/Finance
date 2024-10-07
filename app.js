import express from "express";
import cookieParser from "cookie-parser";
import approutes from "./routes/app-routes.js";
import bodyParser from "body-parser";
import path from "path";
import { configDotenv } from "dotenv";
import cors from "cors";  // Optional if needed

// Load environment variables
configDotenv();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Optional: Enable CORS if frontend is on a different origin
// app.use(cors({ origin: 'https://your-frontend-url.com', credentials: true }));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(path.resolve(), "frontend/browser")));

// API routes
app.use(approutes);

// Fallback to serve index.html for all other routes (for a Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'frontend/browser', 'index.html'));
});

// Cookie setting endpoint for testing
app.get("/setcookie", (req, res) => {
    res.cookie("token", "iamcookie", {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
        secure: process.env.NODE_ENV === 'production',  // Enable in production
    });
    res.status(200).json({ "status": "success avinash" });
});

// Error logging middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port);
});

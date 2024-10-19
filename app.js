import express from "express";
import cookieParser from "cookie-parser";
import approutes from "./routes/app-routes.js";
import bodyParser from "body-parser";
import path from "path";
import { configDotenv } from "dotenv";
import cors from "cors";

// Load environment variables
configDotenv();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

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
        secure: false, // Set to true if your site is served over HTTPS
    });
    res.status(200).json({ "status": "success avinash" });
});

// Start server
app.listen(port, () => {
    console.log("Listening at http://localhost:" + port);
});

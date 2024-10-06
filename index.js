import express from "express";
import path from "path";

const app = express();
import cors from 'cors';
app.use(cors());


// Serve static files from the 'frontend' directory
app.use('/',express.static(path.join(path.resolve(), "frontend/browser")));

// Fallback to serve index.html for all other routes (for a Single Page Application)
app.use((req, res, next) => {
    res.sendFile(path.join(path.resolve(), 'frontend/browser', 'index.html'));
});

// Export the Express app instance
export default app;

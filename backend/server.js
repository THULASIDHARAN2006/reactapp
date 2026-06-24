import express from "express";
import cors from "cors";
import ConnectDB from "./db.js";
import adminRoutes from "./routes/adminRoutes.js"; // Fixed path: changed '../' to './'

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Connection
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// Route Middlewares
app.use("/api/admin", adminRoutes); // Recommended path convention for API endpoints

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
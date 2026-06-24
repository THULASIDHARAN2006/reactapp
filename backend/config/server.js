import express from "express";
import cors from "cors";
import ConnectDB from "./db.js"; // Point to db.js right next to it in config
import adminRoutes from "../routes/adminRoutes.js"; // Go up one level, then into routes

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
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
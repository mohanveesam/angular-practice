const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:4204" }));
// app.use(cors());
// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));   
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use('/uploads', express.static('uploads'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

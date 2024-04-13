import express from "express";
import morgan from "morgan";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// // Authentication middleware
// app.use(authentication);

// Routes
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8007;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database-config";
import errorHandlerMiddleware from "./utils/error/error.middleware";
import requestMappings from "./map";
import UserRouter from "./routes/user-route";

const app: Express = express();

dotenv.config();

app.use(express.json());

//requestMappings(app);

app.use("/user-service", UserRouter);

// Error handler middleware
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 5000;
  try {
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
      connectDB();
    });
  } catch (e) {
    console.log(e);
  }
};

start();

export default app;

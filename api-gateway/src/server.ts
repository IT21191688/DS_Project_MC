import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.disable("x-powered-by");
app.use(express.json());

// Define the services to proxy
interface Service {
  route: string;
  target: string;
}

const services: Service[] = [
  {
    route: "/users/api/v1",
    target: "http://localhost:8001/",
  },
  {
    route: "/chats",
    target: "https://your-deployed-service.herokuapp.com/chats/",
  },
  {
    route: "/payment",
    target: "https://your-deployed-service.herokuapp.com/payment/",
  },
];

// Authentication Middleware
function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      (err: any, decoded: any) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      }
    );
  } else {
    next();
  }
}

services.forEach(({ route, target }) => {
  const proxyOptions: Options = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  app.use(route, authenticateJWT, (req, res, next) => {
    createProxyMiddleware(proxyOptions)(req, res, next);
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({
    code: 500,
    status: "Error",
    message: "Internal Server Error",
    data: null,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});

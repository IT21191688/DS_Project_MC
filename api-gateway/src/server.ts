import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.disable("x-powered-by");

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

// Rate limiting configuration
const rateLimit = 20;
const interval = 60 * 1000;
const requestCounts: Record<string, number> = {};

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, interval);

// Rate limiting and timeout middleware
function rateLimitAndTimeout(req: Request, res: Response, next: NextFunction) {
  const ip: any = req.ip;

  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.destroy();
  });

  next();
}

// Apply rate limiting and timeout middleware
app.use(rateLimitAndTimeout);

// Configure proxy middleware for each service
services.forEach(({ route, target }) => {
  const proxyOptions: Options = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  app.use(route, createProxyMiddleware(proxyOptions));
});

// Route not found handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({
    code: 500,
    status: "Error",
    message: "Internal Server Error",
    data: null,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Gateway is running on port ${PORT}`);
});

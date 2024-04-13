import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { proxyTarget } from "../utils/proxyUtils";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: {
      "^/users": "/api/v1",
    },
    //timeout: 30000, // Increase the timeout value (e.g., 30 seconds)
  })
);

export default router;

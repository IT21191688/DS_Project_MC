import express from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");
import { proxyTarget } from "../utils/proxyUtils";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: proxyTarget.userService,
    changeOrigin: true,
    pathRewrite: {
      "^/users": "/",
    },
  })
);

export default router;

import express from "express";
import { proxyTarget } from "../utils/proxyUtils";
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: proxyTarget.courseService,
    changeOrigin: true,
    pathRewrite: {
      "^/courses": "/",
    },
  })
);

export default router;

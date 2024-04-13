"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const router = express_1.default.Router();
router.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: {
        "^/users": "/api/v1",
    },
    //timeout: 30000, // Increase the timeout value (e.g., 30 seconds)
}));
exports.default = router;

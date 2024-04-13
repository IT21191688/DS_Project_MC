"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyUtils_1 = require("../utils/proxyUtils");
const router = express_1.default.Router();
router.use("/", createProxyMiddleware({
    target: proxyUtils_1.proxyTarget.userService,
    changeOrigin: true,
    pathRewrite: {
        "^/users": "/",
    },
}));
exports.default = router;

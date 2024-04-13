"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proxyUtils_1 = require("../utils/proxyUtils");
const { createProxyMiddleware } = require("http-proxy-middleware");
const router = express_1.default.Router();
router.use("/", createProxyMiddleware({
    target: proxyUtils_1.proxyTarget.courseService,
    changeOrigin: true,
    pathRewrite: {
        "^/courses": "/",
    },
}));
exports.default = router;

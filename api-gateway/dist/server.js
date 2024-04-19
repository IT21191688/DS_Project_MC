"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.disable("x-powered-by");
const services = [
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
const rateLimit = 20;
const interval = 60 * 1000;
const requestCounts = {};
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
        requestCounts[ip] = 0;
    });
}, interval);
function rateLimitAndTimeout(req, res, next) {
    const ip = req.ip;
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
app.use(rateLimitAndTimeout);
services.forEach(({ route, target }) => {
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };
    app.use(route, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions));
});
app.use((_req, res) => {
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found.",
        data: null,
    });
});
app.use((err, _req, res, _next) => {
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

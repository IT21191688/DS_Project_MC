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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.disable("x-powered-by");
app.use(express_1.default.json());
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
// Authentication Middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "", (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        next();
    }
}
services.forEach(({ route, target }) => {
    const proxyOptions = {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${route}`]: "",
        },
    };
    app.use(route, authenticateJWT, (req, res, next) => {
        (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions)(req, res, next);
    });
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

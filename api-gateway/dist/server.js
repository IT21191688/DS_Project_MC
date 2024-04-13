"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// // Authentication middleware
// app.use(authentication);
// Routes
app.use("/courses", courseRoutes_1.default);
app.use("/users", userRoutes_1.default);
const PORT = process.env.PORT || 8007;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});

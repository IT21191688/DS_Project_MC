"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./routes/user-route"));
const constants_1 = __importDefault(require("./utils/constants"));
const requestMappings = (app) => {
    app.use(constants_1.default.API.PREFIX.concat("/users"), user_route_1.default);
};
exports.default = requestMappings;

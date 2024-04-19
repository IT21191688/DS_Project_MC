"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middleware/user-middleware"));
const user_controller_1 = require("../controller/user-controller");
const constants_1 = __importDefault(require("../utils/constants"));
const UserRouter = (0, express_1.Router)();
UserRouter.post("/register", user_controller_1.RegisterUser);
UserRouter.post("/login", user_controller_1.UserLogin);
UserRouter.get("/profile", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.INSTRUCTOR,
    constants_1.default.USER.ROLES.STUDENT,
]), user_controller_1.GetUserProfile);
UserRouter.get("/getAllUser", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), user_controller_1.GetAllUsers);
UserRouter.put("/updateUser", user_middleware_1.default.authorize([
    constants_1.default.USER.ROLES.ADMIN,
    constants_1.default.USER.ROLES.INSTRUCTOR,
    constants_1.default.USER.ROLES.STUDENT,
]), user_controller_1.EditUserDetails);
UserRouter.put("/updateUser/:userId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), user_controller_1.EditUserDetailsUserId);
UserRouter.delete("/deleteUser/:userId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), user_controller_1.DeleteUserDetails);
UserRouter.get("/getOneUser/:userId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), user_controller_1.GetOneUserDetails);
exports.default = UserRouter;

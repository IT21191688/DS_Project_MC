import { Router } from "express";
import UserMiddleware from "../middleware/user-middleware";

import {
  RegisterUser,
  GetUserProfile,
  GetAllUsers,
  EditUserDetails,
  EditUserDetailsUserId,
  UserLogin,
  DeleteUserDetails,
  GetOneUserDetails,
  // getAuth,
} from "../controller/user-controller";
import constants from "../utils/constants";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

UserRouter.post("/login", UserLogin);

UserRouter.get(
  "/profile",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.INSTRUCTOR,
    constants.USER.ROLES.STUDENT,
  ]),
  GetUserProfile
);

UserRouter.get(
  "/getAllUser",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetAllUsers
);

UserRouter.post(
  "/updateUser",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.INSTRUCTOR,
    constants.USER.ROLES.STUDENT,
  ]),
  EditUserDetails
);

UserRouter.put(
  "/updateUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditUserDetailsUserId
);

UserRouter.delete(
  "/deleteUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteUserDetails
);

UserRouter.get(
  "/getOneUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetOneUserDetails
);
export default UserRouter;

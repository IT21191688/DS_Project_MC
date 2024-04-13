import { Router } from "express";
import UserMiddleware from "../middleware/user-middleware";

import {
  RegisterUser,
  GetUserProfile,
  GetAllUsers,
  EditUserDetails,
  EditUserDetailsUserId,
  UserLogin,
  // getAuth,
} from "../controller/user-controller";
import constants from "../utils/constants";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

UserRouter.post("/login", UserLogin);

//UserRouter.post("/getAuth", getAuth);

UserRouter.get(
  "/profile",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.FACULTY,
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
    constants.USER.ROLES.FACULTY,
    constants.USER.ROLES.STUDENT,
  ]),
  EditUserDetails
);

UserRouter.post(
  "/updateUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  EditUserDetailsUserId
);
export default UserRouter;

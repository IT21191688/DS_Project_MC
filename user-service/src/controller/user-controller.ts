import { Request, Response } from "express";
import userUtil from "../utils/user-utill";
import userService from "../services/user-service";
import User from "../models/user-model";
//import Auth from "../auth/auth.model";
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import CustomResponse from "../utils/responce";

import { sendEmail } from "../utils/email/email-server";
import emailService from "../utils/email/email-templates";

// Import custom errors
import NotFoundError from "../utils/error/error.classes/NotFoundError";
import BadRequestError from "../utils/error/error.classes/BadRequestError";

import ErrorHandler from "../utils/error/ErrorHandler";
import constants from "../utils/constants";

const RegisterUser = async (req: Request, res: Response) => {
  const body: any = req.body;
  const user: any = new User(body.user);

  console.log("hello");

  try {
    const existingUser = await userService.findByEmail(user.email);

    if (existingUser) {
      throw new BadRequestError("User already exists!");
    }

    let createdUser = null;

    user.password = await userUtil.hashPassword(body.user.password);

    const session = await startSession();

    //console.log(user);

    try {
      session.startTransaction();

      createdUser = await userService.save(user, session);

      if (createdUser != null) {
        const subject = "Register Success";
        const htmlBody = emailService.UserRegisteredEmail({
          fullName: createdUser.firstname + " " + createdUser.lastname,
        });

        await sendEmail(user.email, subject, htmlBody, null);
      }

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      // End session
      session.endSession();
    }

    return CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "User registered successfully!",
      createdUser
    );
  } catch (error) {
    ErrorHandler.handle(res, error);
  }
};

const UserLogin = async (req: Request, res: Response) => {
  const body: any = req.body;

  try {
    if (!body.email || !body.password) {
      throw new BadRequestError("Email and password are required");
    }

    const isAuthCheck: any = await userService.findByEmail(body.email);

    if (!isAuthCheck) {
      throw new NotFoundError("Invalid email!");
    }

    const isPasswordMatch = await userUtil.comparePassword(
      body.password,
      isAuthCheck.password
    );

    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid password!");
    }

    const token = userUtil.signToken(isAuthCheck);

    let user = {
      fullName: isAuthCheck.fullName,
      email: isAuthCheck.email,
      role: isAuthCheck.role,
    };

    CustomResponse(res, true, StatusCodes.OK, "Log in successfully!", {
      token,
      user: user,
    });
  } catch (error) {
    ErrorHandler.handle(res, error);
  }
};

const GetUserProfile = async (req: Request, res: Response) => {
  try {
    const auth: any = req.auth;

    const user = await userService.findById(auth._id);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    return CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Profile fetched successfully!",
      user
    );
  } catch (error) {
    ErrorHandler.handle(res, error);
  }
};

const GetAllUsers = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const users = await userService.getAllUsers();

  return CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "All Users fetched successfully!",
    users
  );
};

const EditUserDetails = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user = await userService.findById(auth._id);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const userId = auth._id;
  const updatedDetails = req.body;

  const updatedUser = await userService.editUserDetails(userId, updatedDetails);

  return CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Edit User successfully!",
    updatedUser
  );
};

const EditUserDetailsUserId = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const userId: any = req.params.userId;

  // console.log(userId);

  const user = await userService.findById(auth._id);

  if (!user) {
    throw new NotFoundError("User not found!");
  }

  const updatedDetails = req.body;

  const updatedUser = await userService.editUserDetails(userId, updatedDetails);

  return CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Edit User successfully!",
    updatedUser
  );
};

export {
  RegisterUser,
  GetUserProfile,
  GetAllUsers,
  EditUserDetails,
  EditUserDetailsUserId,
  UserLogin,
};

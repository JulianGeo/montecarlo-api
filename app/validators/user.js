import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validateSignUp = [
  check("firstName").exists("First name is required"),
  check("lastName").exists(),
  check("email").exists().isEmail(),
  check("password").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateSignIn = [
  check("email").exists().isEmail(),
  check("password").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

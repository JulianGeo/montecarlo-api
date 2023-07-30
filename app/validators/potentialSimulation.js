import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const inputPotentialValidator = [
  check("phie_average")
    .exists()
    .custom((value, { req }) => {
      if (value < 0 || value > 1) {
        throw new Error("Invalid porosity value");
      }
      return true;
    }),
  check("phie_desvest")
    .exists()
    .custom((value, { req }) => {
      if (value < 0 || value > 1) {
        throw new Error("Invalid porosity desvest value");
      }
      return true;
    }),
  check("h_min")
    .exists()
    .custom((value, { req }) => {
      if (value < 0) {
        throw new Error("h_min value must be greater than 0");
      }
      return true;
    }),
  check("h_med")
    .exists()
    .custom((value, { req }) => {
      if (value < 0) {
        throw new Error("h_med value must be greater than 0");
      }
      return true;
    }),
  check("h_max")
    .exists()
    .custom((value, { req }) => {
      if (value < 0) {
        throw new Error("h_max value must be greater than 0");
      }
      return true;
    }),
  check("area")
    .exists()
    .custom((value, { req }) => {
      if (value < 0) {
        throw new Error("area value must be greater than 0");
      }
      return true;
    }),
  check("iterations")
    .exists()
    .custom((value, { req }) => {
      if (value < 0 || value > 5000) {
        throw new Error("Iterations value must be between 0 and 5000");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

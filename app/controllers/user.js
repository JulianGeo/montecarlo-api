import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import { httpError } from "../helpers/errorHandler.js";

const secret = process.env.JWT_SECRET;

/**
 * Function to log or authenticate a user based on email and password.
 * Compares in the Mongo database if there is a user with the credentials
 * The email and password are provided by the request.
 * Returns in an he authentication response with the token.
 * Authentication lasts 1 hour.
 * @param {Request} req request
 * @param {Response} res response
 */
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    httpError(res, err, "Something went wrong");
  }
};

/**
 * Function to register a user in the Mongo database.
 * Check if the user already exists based on the mail.
 * The email and password are provided by the request.
 * Returns in the authentication token response.
 * @param {Request} req request
 * @param {Response} res response
 */
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

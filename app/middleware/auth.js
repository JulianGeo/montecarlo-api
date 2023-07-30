import jwt from "jsonwebtoken";
import { httpError } from "../helpers/errorHandler.js";

/**
 * Function to handle the JWT validation
 *
 * @param {Request} req request
 * @param {Response} res response
 * @param {Function} next Error handling function
 */
const auth = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Fix the typo here
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    httpError(res, error, "Invalid token", 401);
    console.log(error);
  }
};

export default auth;

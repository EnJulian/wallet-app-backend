// check token
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

import config from "../config/env/index";

const SECRET = config.JWT_SECRET_KEY;

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "You are not logged in!",
        data: null,
      });
    }

    if (authorization) {
      const getAuthorization: string = authorization.split(" ")[1];

      const walletOwner: JwtPayload = jwt.verify(
        getAuthorization,
        SECRET
      ) as JwtPayload;

      if (!walletOwner) {
        return res.status(401).json({
          status: "error",
          code: 403,
          message: "You are not authorized to make this request!",
          data: null,
        });
      }

      const userId = walletOwner._id;
      // assign user id to request
      Object.assign(req, { userId });
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "kindly logged in!",
        data: null,
      });
    }

    next(error);
  }
};

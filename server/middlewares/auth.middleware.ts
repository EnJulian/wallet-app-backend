import * as dotenv from 'dotenv'
import { type Request, type Response, type NextFunction } from 'express'
import { CustomRequest } from '../repository/userDataType';
import {verify} from "jsonwebtoken";
dotenv.config();

export const checkAuthorizationToken = (authorization: any) => {
    let bearerToken = null;
    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
}

export const checkToken = (req: Request) => {
    const {
        headers: { authorization }
    } = req;
    const bearerToken = checkAuthorizationToken(authorization);
    return req.body.refreshToken
        ? req.body.refreshToken
        : bearerToken ||
        req.headers['x-access-token'] ||
        req.headers.token ||
        req.body.token;
}
export const verifyToken = (token: string, JWT_SECRET_KEY: string) => {
    return verify(token, JWT_SECRET_KEY);
}

export const authenticate = (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        const token = checkToken(req);
    if (!token) {
        return res.status(400).json({
            code: 404,
            status: 'error',
            message: 'bearer token is required',
            data: null
        })
    }
        const data = verifyToken(token, process.env.JWT_SECRET_KEY as string);
        if (!data){
            return{
                code:401,
                status: 'error',
                message: 'data does not exist',
            }
        }
  
        Object.assign(req, { data });

        return next();
    } catch (err) {
        return res.status(403).json({
            code: 403,
            status: 'error',
            message: 'invalid token',
            data: null
        })
    }
}











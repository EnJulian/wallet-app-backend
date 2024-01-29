import { type UserDataType } from './userDataType'
import { Request } from 'express'


export interface CustomRequest extends Request {
    data: UserDataType;
}

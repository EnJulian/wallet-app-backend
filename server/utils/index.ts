// utils.ts

import { type Response } from 'express'


// Class for storing generic functions to be used in the entire code
export class Utils {
    static getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    static accountNumbers(): string {
        const accountNumberLength = 11;
        const randomNumberArray = Array.from({ length: accountNumberLength }, () => Utils.getRandomNumber(0, 9));
        return randomNumberArray.join('');
    }

    static responseProvider = (
        res: Response,
        status: string,
        message: string,
        code: number
    ) => {
        return res.status(code).json({ status, code, message })
    }
        

    static provideResponse = (
        code: number,
        status: string,
        message: string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        data: Object
    ) => {
        return {
            code,
            status,
            message,
            data
        }
    }
    
}

export class ErrorResponseProvider extends Error {
    code: number
    status: string
    constructor (code: number, status: string, message: string) {
        super(message)
        this.code = code
        this.status = status
    }
}


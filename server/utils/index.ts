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
    

    
}

// TODO Include response functions in above class

// Response provider for middlewares
/**
 * format error messages
 * @date 1/15/2024 - 12:26:30 PM
 *
 * @param {*} res
 * @param status
 * @param {*} code
 * @param {*} message
 * @returns {*}
 */

 const responseProvider = (
    res: Response,
    status: string,
    message: string,
    code: number
) => {
    return res.status(code).json({ status, code, message })
}

/**
 * services response provider
 * @date 1/15/2024 - 12:26:30 PM
 *
 * @param code
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @returns JSON Record<string, unknown> as response data
 */

 const provideResponse = (
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

 class ErrorResponseProvider extends Error {
    code: number
    status: string
    constructor (code: number, status: string, message: string) {
        super(message)
        this.code = code
        this.status = status
    }
}

export {
    responseProvider,
    provideResponse,
    ErrorResponseProvider
}

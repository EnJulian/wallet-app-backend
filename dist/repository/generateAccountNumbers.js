"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountNumbers = void 0;
/**
 * generate random number
 * @date 1/17/2024 - 8:06:34 PM
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
/**
 * Description placeholder
 * @date 1/17/2024 - 8:06:34 PM
 *
 * @export
 * @returns {string}
 */
const accountNumbers = () => {
    const randomNumberRange = Array.from(new Array(12), (x, i) => i);
    let accountNumber = '';
    for (const i of randomNumberRange) {
        const randomNumber = (getRandomNumber(0, 9)).toString();
        accountNumber += randomNumber;
    }
    return accountNumber;
};
exports.accountNumbers = accountNumbers;

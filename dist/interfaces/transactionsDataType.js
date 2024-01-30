"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["success"] = "success";
    TransactionStatus["fail"] = "fail";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var WalletType;
(function (WalletType) {
    WalletType["naira"] = "NairaWallet";
    WalletType["dollar"] = "DollarWallet";
})(WalletType || (exports.WalletType = WalletType = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getSecret = function () {
    return process.env['JWT_SECRET'];
};
exports.getSecret = getSecret;

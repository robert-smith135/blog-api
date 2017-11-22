"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extractToken = function (req) {
    return req.body.token || req.query.token || req.headers['authorization'];
};
exports.extractToken = extractToken;

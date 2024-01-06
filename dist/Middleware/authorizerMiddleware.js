"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizerMiddleware = (role) => {
    return (req, res, next) => {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    };
};
exports.default = authorizerMiddleware;

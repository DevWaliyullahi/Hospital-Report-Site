"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Doctors_1 = __importDefault(require("../Models/Doctors"));
const loginValidator_1 = require("../routes/Validators/loginValidator");
class AuthenticationController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Validate login input
                const { error } = (0, loginValidator_1.validateLoginInput)({ email, password });
                if (error) {
                    res.status(HttpStatus.BAD_REQUEST).json({ error: error.details[0].message });
                    return;
                }
                // Find user by email
                const user = yield Doctors_1.default.findOne({ where: { email } });
                // Check if user exists
                if (!user) {
                    res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
                    return;
                }
                // Check password
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (!match) {
                    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Incorrect password' });
                    return;
                }
                const secret = process.env.secret;
                // Create and sign a JWT token
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: '1h' });
                res.json({ token });
            }
            catch (error) {
                // Log unexpected errors
                console.error('Authentication error:', error);
                next(error);
            }
        });
    }
}
exports.default = AuthenticationController;
// Define HTTP status codes as constants or use an enum
const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
};

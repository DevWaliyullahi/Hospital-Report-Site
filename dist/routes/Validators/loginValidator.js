"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation schema for login input
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
// Function to validate login input
const validateLoginInput = (data) => {
    return loginSchema.validate(data);
};
exports.validateLoginInput = validateLoginInput;

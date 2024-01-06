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
const express_1 = __importDefault(require("express"));
const Authentication_1 = __importDefault(require("../Controller/Authentication"));
const loginValidator_1 = require("../routes/Validators/loginValidator");
const router = express_1.default.Router();
const authController = new Authentication_1.default();
// Login route
router.post('/login', loginValidator_1.validateLoginInput, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the login method on the shared AuthenticationController instance
        yield authController.login(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Reports_1 = __importDefault(require("../Controller/Reports"));
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const router = express_1.default.Router();
const reportsController = new Reports_1.default();
// Create a new report
router.post('/', authMiddleware_1.default, Reports_1.default.createReport);
// Get all reports
router.get('/', Reports_1.default.getAllReports);
// Get a single report
router.get('/:id', authMiddleware_1.default, Reports_1.default.getReportById);
// Update a report
router.put('/:id', authMiddleware_1.default, Reports_1.default.updateReport);
// Delete a report
router.delete('/:id', authMiddleware_1.default, Reports_1.default.deleteReport);
exports.default = router;

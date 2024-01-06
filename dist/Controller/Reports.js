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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Reports_1 = __importDefault(require("../Models/Reports"));
const uuid_1 = require("uuid");
class ReportsController {
}
_a = ReportsController;
// Get all reports
ReportsController.getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield Reports_1.default.findAll();
        res.render('report', { title: 'Reports', reports });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Get a single report by ID
ReportsController.getReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const report = yield Reports_1.default.findByPk(id);
        if (report) {
            res.json(report);
        }
        else {
            res.status(404).send('Report not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Create a new report
ReportsController.createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientName, email, age, gender, phoneNumber, address, hospitalName, weight, height, bloodGroup, genotypes, bloodPressure, hiv_status, hepatitis_status, } = req.body;
    try {
        const newReport = yield Reports_1.default.create({
            patientName,
            email,
            age,
            gender,
            phoneNumber,
            address,
            hospitalName,
            weight,
            height,
            bloodGroup,
            genotypes,
            bloodPressure,
            hiv_status,
            hepatitis_status,
            id: (0, uuid_1.v4)(),
        });
        res.status(201).json(newReport);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Update a report by ID
ReportsController.updateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { patientName, email, age, gender, phoneNumber, address, hospitalName, weight, height, bloodGroup, genotypes, bloodPressure, hiv_status, hepatitis_status, } = req.body;
    try {
        const report = yield Reports_1.default.findByPk(id);
        if (report) {
            yield report.update({
                patientName,
                email,
                age,
                gender,
                phoneNumber,
                address,
                hospitalName,
                weight,
                height,
                bloodGroup,
                genotypes,
                bloodPressure,
                hiv_status,
                hepatitis_status,
            });
            res.json(report);
        }
        else {
            res.status(404).send('Report not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Delete a report by ID
ReportsController.deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const report = yield Reports_1.default.findByPk(id);
        if (report) {
            yield report.destroy();
            res.send('Report deleted successfully');
        }
        else {
            res.status(404).send('Report not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
exports.default = ReportsController;

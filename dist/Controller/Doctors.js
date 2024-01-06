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
const Doctors_1 = __importDefault(require("../Models/Doctors"));
const Reports_1 = __importDefault(require("../Models/Reports"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class DoctorsController {
}
_a = DoctorsController;
// Get all doctors
DoctorsController.getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield Doctors_1.default.findAll();
        res.json(doctors);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Get a single doctor by ID
DoctorsController.getDoctorDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    if (id == undefined) {
        res.status(401).send('Unauthorized');
    }
    try {
        const doctor = yield Doctors_1.default.findAll({ where: { id: id } });
        if (doctor) {
            const reports = yield Reports_1.default.findAll({ where: { id: id } });
            res.render('dashboard', { doctor, reports });
        }
        else {
            res.status(404).send('Doctor not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Create a new doctor
DoctorsController.createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorsName, email, specializations, gender, phoneNumber, password } = req.body;
    try {
        const newDoctor = yield Doctors_1.default.create({
            id: (0, uuid_1.v4)(),
            doctorsName,
            email,
            specializations,
            gender,
            phoneNumber,
            password,
        });
        res.status(201).redirect('/doctors/login');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
DoctorsController.loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const doctor = yield Doctors_1.default.findOne({ where: { email } });
        if (!doctor) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: doctor.id, email: doctor.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).redirect('/doctors/dashboard');
    }
    catch (error) {
        console.error('Error in loginDoctor:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Update a doctor by ID
DoctorsController.updateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { doctorsName, email, specializations, gender, phoneNumber, password } = req.body;
    try {
        const doctor = yield Doctors_1.default.findByPk(id);
        if (doctor) {
            yield doctor.update({
                doctorsName,
                email,
                specializations,
                gender,
                phoneNumber,
                password,
            });
            res.json(doctor);
        }
        else {
            res.status(404).send('Doctor not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
// Delete a doctor by ID
DoctorsController.deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield Doctors_1.default.findByPk(id);
        if (doctor) {
            yield doctor.destroy();
            res.send('Doctor deleted successfully');
        }
        else {
            res.status(404).send('Doctor not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
exports.default = DoctorsController;

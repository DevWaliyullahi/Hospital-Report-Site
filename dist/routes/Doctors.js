"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Doctors_1 = __importDefault(require("../Controller/Doctors"));
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const router = express_1.default.Router();
const doctorsController = new Doctors_1.default();
//get route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
//get route for rendering doctor login form
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
// sign up a doctor
router.post('/signup', Doctors_1.default.createDoctor);
// Get all doctors
router.get('/', Doctors_1.default.getAllDoctors);
// Get a single doctor
// router.get('/:id', Doctors.getDoctorById);
// Update a doctor
router.put('/:id', Doctors_1.default.updateDoctor);
// Delete a doctor
router.delete('/:id', Doctors_1.default.deleteDoctor);
router.post('/login', Doctors_1.default.loginDoctor);
//get route for rendering the doctor dashboard
router.get('/dashboard', authMiddleware_1.default, Doctors_1.default.getDoctorDashboard);
// Get doctor listings
router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login' });
});
exports.default = router;

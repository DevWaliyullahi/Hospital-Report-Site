import express from 'express';
import { Request, Response, NextFunction } from 'express';
import Doctors from '../Controller/Doctors';
import { validateLoginInput } from '../routes/Validators/loginValidator';
import authorizeDoctor from '../Middleware/authorizerMiddleware';
import authMiddleware from '../Middleware/authMiddleware';

interface AuthenticatedRequest extends Request {
    user?: {
      userId: string;
      email: string;
      role: string;
    };
  }
  

const router = express.Router();
const doctorsController = new Doctors();

//get route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
})

//get route for rendering doctor login form
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});



// sign up a doctor
router.post('/signup', Doctors.createDoctor);

// Get all doctors
router.get('/', Doctors.getAllDoctors);

// Get a single doctor
// router.get('/:id', Doctors.getDoctorById);


// Update a doctor
router.put('/:id', Doctors.updateDoctor);

// Delete a doctor
router.delete('/:id', Doctors.deleteDoctor);

router.post('/login', Doctors.loginDoctor);

//get route for rendering the doctor dashboard
router.get('/dashboard', authMiddleware , Doctors.getDoctorDashboard);


// Get doctor listings
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('login', { title: 'Login' });
});


export default router;

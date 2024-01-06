import { Request, Response } from 'express';
import Doctors from '../Models/Doctors';
import Report from '../Models/Reports';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

class DoctorsController {

  // Get all doctors
  static getAllDoctors = async (req: Request, res: Response) => {
    try {
      const doctors = await Doctors.findAll();
      res.json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Get a single doctor by ID
  static getDoctorDashboard = async (req: AuthenticatedRequest, res: Response) => {

    const id = req.user?.userId;

    if(id == undefined){
      res.status(401).send('Unauthorized');
    }

    try {
      const doctor = await Doctors.findAll({ where: { id: id } });


      if (doctor) {

        const reports = await Report.findAll({ where: { id: id } });


        res.render('dashboard', { doctor, reports })
      } else {
        res.status(404).send('Doctor not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Create a new doctor
static createDoctor = async (req: Request, res: Response) => {
const { doctorsName, email, specializations, gender, phoneNumber, password } = req.body;
    try {
        const newDoctor = await Doctors.create({
            id: uuidv4(),
            doctorsName,
            email,
            specializations,
            gender,
            phoneNumber,
            password,
        });
        res.status(201).redirect('/doctors/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


static loginDoctor = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctors.findOne({ where: { email } });

    if (!doctor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: doctor.id, email: doctor.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.status(200).redirect('/doctors/dashboard');
  } catch (error) {
    console.error('Error in loginDoctor:', error);
    res.status(500).send('Internal Server Error');
  }
};

  
  // Update a doctor by ID
  static updateDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { doctorsName, email, specializations, gender, phoneNumber, password } = req.body;
    try {
      const doctor = await Doctors.findByPk(id);
      if (doctor) {
        await doctor.update({
          doctorsName,
          email,
          specializations,
          gender,
          phoneNumber,
          password,
        });
        res.json(doctor);
      } else {
        res.status(404).send('Doctor not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Delete a doctor by ID
  static deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const doctor = await Doctors.findByPk(id);
      if (doctor) {
        await doctor.destroy();
        res.send('Doctor deleted successfully');
      } else {
        res.status(404).send('Doctor not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

}

export default DoctorsController;

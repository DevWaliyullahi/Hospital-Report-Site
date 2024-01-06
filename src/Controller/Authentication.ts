import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Doctors from '../Models/Doctors';
import { validateLoginInput } from '../routes/Validators/loginValidator';

class AuthenticationController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate login input
      const { error } = validateLoginInput({ email, password });
      if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: error.details[0].message });
        return;
      }

      // Find user by email
      const user = await Doctors.findOne({ where: { email } });

      // Check if user exists
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
        return;
      }

      // Check password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Incorrect password' });
        return;
      }
      const secret: any = process.env.secret;
      // Create and sign a JWT token
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      // Log unexpected errors
      console.error('Authentication error:', error);
      next(error);
    }
  }
}

export default AuthenticationController;

// Define HTTP status codes as constants or use an enum
const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

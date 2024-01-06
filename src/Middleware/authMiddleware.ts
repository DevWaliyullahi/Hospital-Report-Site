import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import Doctors from '../Models/Doctors'; 

interface TokenPayload {
  userId: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // const token = req.header('Authorization');
    const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing or invalid format' });
  }

  try {
   
    const secret: any = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as TokenPayload;

    const user = await Doctors.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: 'doctor', // Assuming all authenticated users have the role 'doctor'
    };

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Handle other errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default authMiddleware;

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import AuthenticationController from '../Controller/Authentication';
import { validateLoginInput } from '../routes/Validators/loginValidator';

const router = express.Router();
const authController = new AuthenticationController();

// Login route
router.post('/login', validateLoginInput, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the login method on the shared AuthenticationController instance
    await authController.login(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;

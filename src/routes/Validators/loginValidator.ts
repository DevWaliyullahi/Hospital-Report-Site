import Joi from 'joi';

// Validation schema for login input
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Function to validate login input
const validateLoginInput = (data: any) => {
  return loginSchema.validate(data);
};

export { validateLoginInput };

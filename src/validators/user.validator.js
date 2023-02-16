const Joi = require("joi");

const userAddSchema = Joi.object({
  first_name: Joi.string().max(255).required().trim(),
  last_name: Joi.string().max(255).required().trim(),
  dob: Joi.string().max(255).required().trim(),
  email: Joi.string()
    .max(255)
    .required()
    .trim()
    .email({ minDomainSegments: 2 }),
  phone_number: Joi.number().integer().required(),
  password: Joi.string().max(255).required().trim(),
  role: Joi.string().max(255).optional().trim(),
  delivery_address: Joi.string().max(255).required().trim(),
});

async function addUserValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await userAddSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    error.source = "user validation";
    error.message = error.details[0].message;
    next(error);
  }
}

module.exports = {
  addUserValidationMW,
};

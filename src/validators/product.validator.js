const Joi = require("joi");

const productAddSchema = Joi.object({
  name: Joi.string().max(255).required().trim(),
  short_description: Joi.string().max(255).required().trim(),
  long_description: Joi.string().required().trim(),
  category: Joi.string().max(255).required().trim(),
  price: Joi.number().integer().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(255).optional().trim(),
  short_description: Joi.string().max(255).optional().trim(),
  long_description: Joi.string().optional().trim(),
  category: Joi.string().max(255).optional().trim(),
  price: Joi.number().integer().optional(),
});

async function addProductValidationMW(req, res, next) {
  const blogPayLoad = req.body;

  try {
    await productAddSchema.validateAsync(blogPayLoad);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.details[0].message,
    });
  }
}

async function updateProductValidationMW(req, res, next) {
  const blogPayLoad = req.body;

  try {
    await updateProductSchema.validateAsync(blogPayLoad);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.details[0].message,
    });
  }
}

module.exports = {
  addProductValidationMW,
  updateProductValidationMW,
};

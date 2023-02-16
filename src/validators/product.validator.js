const Joi = require("joi");

const productAddSchema = Joi.object({
  name: Joi.string().max(255).required().trim(),
  short_description: Joi.string().max(255).required().trim(),
  long_description: Joi.string().required().trim(),
  category: Joi.string().max(255).required().trim(),
  price: Joi.number().integer().required(),
  image: Joi.string().optional().trim(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(255).optional().trim(),
  short_description: Joi.string().max(255).optional().trim(),
  long_description: Joi.string().optional().trim(),
  category: Joi.string().max(255).optional().trim(),
  price: Joi.number().integer().optional(),
  image: Joi.string().optional().trim(),
});

async function addProductValidationMW(req, res, next) {
  const payLoad = req.body;

  try {
    await productAddSchema.validateAsync(payLoad);
    next();
  } catch (error) {
    error.source = "product validation";
    error.message = error.details[0].message;
    next(error);
  }
}

async function updateProductValidationMW(req, res, next) {
  const payLoad = req.body;

  try {
    await updateProductSchema.validateAsync(payLoad);
    next();
  } catch (error) {
    error.source = "product validation";
    error.message = error.details[0].message;
    next(error);
  }
}

module.exports = {
  addProductValidationMW,
  updateProductValidationMW,
};

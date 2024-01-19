import Joi from "joi";

const paymentSchema = Joi.object({
    fullname: Joi.required(),
    cardNumber: Joi.number().integer().required(),
    expiryDate: Joi.required(),
    cvvNumber: Joi.number().integer().length(3).required(),
});

export { paymentSchema };

import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    emailOrMobile: Joi.alternatives([
        Joi.string().email({ tlds: false }),
        Joi.string().pattern(/^[0-9]{10}$/),
    ]).required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{8,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

export { registerSchema };

import Joi from "joi";

const itemSchema = Joi.object({
    productImage: Joi.required(),
    productName: Joi.string().trim().required(),
    productPrice: Joi.number().min(0).integer().required(),
    typeOfCategory: Joi.required(),
    latitude: Joi.required(),
    longitude: Joi.required(),
    categoryId: Joi.required(),
    description: Joi.string().max(100),
});

const vehicleSchema = Joi.object({
    productImage: Joi.required(),
    productName: Joi.string().trim().required(),
    vehicleType: Joi.required(),
    vehicleModel: Joi.string().trim().required(),
    vehicleBrand: Joi.string().trim().required(),
    vehicleYears: Joi.required(),
    latitude: Joi.required(),
    longitude: Joi.required(),
    productPrice: Joi.number().min(0).integer().required(),
    description: Joi.string().max(100),
});

const homeSchema = Joi.object({
    productImage: Joi.required(),
    productName: Joi.string().trim().required(),
    homeProperty: Joi.required(),
    homeType: Joi.required(),
    bedroomQuantity: Joi.number().integer().positive().required(),
    bathroomQuantity: Joi.number().integer().positive().required(),
    productPrice: Joi.number().min(0).integer().required(),
    homeAddress: Joi.string().required(),
    latitude: Joi.required(),
    longitude: Joi.required(),
    description: Joi.string().max(100),
});
const filterPriceSchema = Joi.object({
    minPrice: Joi.number().min(0).integer(),
    maxPrice: Joi.number().min(0).integer(),
});

const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
});

export { itemSchema, vehicleSchema, homeSchema, filterPriceSchema, userSchema };

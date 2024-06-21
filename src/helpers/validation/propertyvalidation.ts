import Joi from "joi";

export const propertyValidationSchema = Joi.object({
  agentId: Joi.string().required(),
  title: Joi.string().required(),
  propertyImages: Joi.array().items(Joi.string().uri()).required(),
  price: Joi.string().required(),
  address: Joi.string().required(),
  reference: Joi.string().required(),
  bedrooms: Joi.string().required(),
  bathrooms: Joi.string().required(),
  livingArea: Joi.string().required(),
  plotArea: Joi.string().required(),
  toTheBeach: Joi.string().required(),
  buildYear: Joi.string().required(),
  aboutTheProperty: Joi.string().required(),
  canIRentItIfIBuyIt: Joi.string().required(),
  doYouOfferPropertyMaintenance: Joi.string().required(),
  canIGetALoan: Joi.string().required(),
  doIGetTheGoldenVisa: Joi.string().required(),
  mapLocation: Joi.string().uri().required(),
  createdAt: Joi.date().default(Date.now),
});

import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  agentId: mongoose.Types.ObjectId;
  title: string;
  propertyImages: string[];
  price: string;
  address: string;
  reference: string;
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  plotArea: string;
  toTheBeach: string;
  buildYear: string;
  aboutTheProperty: string;
  canIRentItIfIBuyIt: string;
  doYouOfferPropertyMaintenance: string;
  canIGetALoan: string;
  doIGetTheGoldenVisa: string;
  mapLocation: string;
  createdAt: Date;
}

const PropertySchema: Schema = new Schema({
  agentId: { type: mongoose.Types.ObjectId, ref: "Agent", required: true },
  title: { type: String, required: true },
  propertyImages: { type: [String], required: true },
  price: { type: String, required: true },
  address: { type: String, required: true },
  reference: { type: String, required: true },
  bedrooms: { type: String, required: true },
  bathrooms: { type: String, required: true },
  livingArea: { type: String, required: true },
  plotArea: { type: String, required: true },
  toTheBeach: { type: String, required: true },
  buildYear: { type: String, required: true },
  aboutTheProperty: { type: String, required: true },
  canIRentItIfIBuyIt: { type: String, required: true },
  doYouOfferPropertyMaintenance: { type: String, required: true },
  canIGetALoan: { type: String, required: true },
  doIGetTheGoldenVisa: { type: String, required: true },
  mapLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Property = mongoose.model<IProperty>("Property", PropertySchema);

export default Property;

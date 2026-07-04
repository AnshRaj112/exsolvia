import mongoose, { Document, Schema } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  organization?: string;
  email?: string;
  clearanceLevel?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactInquirySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    clearanceLevel: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContactInquiry =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);

export default ContactInquiry;

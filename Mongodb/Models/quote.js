import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [5, "Name is too short"],
    },

    user: mongoose.Schema.ObjectId,

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
    },

    movingFrom: {
      type: String,
      required: [true, "Where are you moving to?"],
    },

    movingTo: {
      type: String,
      required: [true, "Where are you moving to?"],
    },

    apptFromType: {
      type: String,
      required: [true, "What type of appartment are you moving from?"],
    },

    apptToType: {
      type: String,
      required: [true, "What type of appartment are you moving to?"],
    },

    service: {
      type: String,
      required: [true, "What do you want us to assist you with?"],
    },

    amount: String,

    status: String,

    preferedTime: String,
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", quoteSchema);

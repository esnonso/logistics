import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: [5, "Name is too short"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [7, "Password must have up to 7 characters"],
    },

    phone: { type: String, required: [true, "Phone number is required"] },

    address: String,

    role: { type: String, default: "user" },

    confirmed: { type: Boolean, default: false },

    confirmationCode: String,

    resetPassword: String,

    shipments: [],

    quotes: [],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

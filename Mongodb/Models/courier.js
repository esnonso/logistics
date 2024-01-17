import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },

    receipientName: {
      type: String,
      required: [true, "Name is required"],
      min: [5, "Name is too short"],
    },

    receipientPhone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    pickupAddress: {
      type: String,
      required: [true, "Pickup address is required"],
    },

    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },

    shipmentType: {
      type: String,
      required: [true, "The type of shipment is required"],
    },

    fragile: {
      type: String,
      required: [true, "Is your shipment fragile?"],
    },

    value: String,

    description: String,

    paymentStatus: { type: String },

    deliveryStatus: { type: String, default: "With user" },

    transactionRef: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Courier ||
  mongoose.model("Courier", courierSchema);

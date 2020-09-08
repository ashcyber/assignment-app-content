const mongoose = require("mongoose");
const { vehicle_types } = require("../constants");
const vehicleSchema = new mongoose.Schema(
  {
    vehicle_display_id: {
      type: String,
    },
    license_plate: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    vehicle_type: {
      type: String,
      required: true,
      enum: [...vehicle_types],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);

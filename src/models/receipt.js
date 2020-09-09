const mongoose = require("mongoose");

const { trip_types } = require("../constants");

const receiptSchema = new mongoose.Schema(
  {
    receipt_display_id: {
      type: String,
    },
    toll_both_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TollBooth",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vechicle",
    },
    type: {
      type: String,
      enum: [...trip_types],
    },
    total: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Receipt", receiptSchema);

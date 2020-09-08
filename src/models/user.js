const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    user_display_id: {
      type: String,
    },
    full_name: {
      type: String,
      required: true,
    },
    driving_license: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const tollBoothSchema = new mongoose.Schema(
  {
    tollbooth_display_id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("TollBooth", tollBoothSchema);

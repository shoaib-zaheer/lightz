const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
      minlength: 4,
    },
    state: {
      type: String,
      required: true,
      minlength: 4,
    },
    electrified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
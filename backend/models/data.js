const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  {
    timestamps: true
  }
);

DataSchema.set("collection", "fullstack");

module.exports = mongoose.model("Data", DataSchema);

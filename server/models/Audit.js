const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  tool: String,
  action: String,
  savings: Number,
  reason: String,
});

const auditSchema = new mongoose.Schema(
  {
    teamSize: Number,

    useCase: String,

    tools: Array,

    monthlySavings: Number,

    annualSavings: Number,

    recommendations: [recommendationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audit", auditSchema);
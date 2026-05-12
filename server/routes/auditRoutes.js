const generateSummary = require("../services/summaryService");
const Audit = require("../models/Audit");
const express = require("express");
const generateAudit =
  require("../utils/auditEngine");
const router = express.Router();

router.post("/",  async (req, res) => {
  const { tools } = req.body;

  const {
  monthlySavings,
  annualSavings,
  recommendations,
} = generateAudit(req.body.tools);

  const summary = await generateSummary({
    monthlySavings,
    annualSavings,
    recommendations,
  });

  const audit = await Audit.create({
  teamSize: req.body.teamSize,
  useCase: req.body.useCase,
  tools: req.body.tools,
  monthlySavings,
  annualSavings,
  recommendations,
  summary,
});

res.json(audit);
});

router.get("/:id", async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json(audit);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
const Audit = require("../models/Audit");
const express = require("express");

const router = express.Router();

router.post("/",  async (req, res) => {
  const { tools } = req.body;

  const recommendations = [];

  let totalSavings = 0;

  tools.forEach((tool) => {
    if (
      tool.name === "ChatGPT" &&
      tool.plan.toLowerCase() === "team" &&
      tool.seats <= 2
    ) {
      recommendations.push({
        tool: "ChatGPT Team",
        action: "Switch to ChatGPT Plus",
        savings: 20,
        reason:
          "Team collaboration features are unnecessary for small teams.",
      });

      totalSavings += 20;
    }

    if (
      tool.name === "Claude" &&
      tool.plan.toLowerCase() === "max"
    ) {
      recommendations.push({
        tool: "Claude Max",
        action: "Downgrade to Claude Pro",
        savings: 180,
        reason:
          "Current usage does not justify Max tier pricing.",
      });

      totalSavings += 180;
    }

    if (
      tool.name === "GitHub Copilot"
    ) {
      recommendations.push({
        tool: "GitHub Copilot",
        action: "Evaluate Cursor Pro",
        savings: 40,
        reason:
          "Cursor offers integrated workflows with lower overall tooling cost.",
      });

      totalSavings += 40;
    }
  });

  const audit = await Audit.create({
  teamSize: req.body.teamSize,
  useCase: req.body.useCase,
  tools: req.body.tools,
  monthlySavings: totalSavings,
  annualSavings: totalSavings * 12,
  recommendations,
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
const express = require("express");

const router = express.Router();

const Lead = require("../models/Leads");
const sendAuditEmail =
  require("../services/emailService");

const Audit =
  require("../models/Audit");
router.post("/", async (req, res) => {
  try {

    // Honeypot spam protection
    if (req.body.website) {
      return res.status(400).json({
        message: "Spam detected",
      });
    }

    const lead = await Lead.create({
      email: req.body.email,
      company: req.body.company,
      role: req.body.role,
      teamSize: req.body.teamSize,
      auditId: req.body.auditId,
    });
    const audit = await Audit.findById(
    req.body.auditId
    );

    
    await sendAuditEmail({
    email: req.body.email,
    monthlySavings:
        audit?.monthlySavings || 0,
    });

    res.json({
      success: true,
      lead,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
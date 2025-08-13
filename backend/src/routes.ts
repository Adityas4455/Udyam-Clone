import express from "express";
import { AadhaarSchema, PanSchema } from "./validators";
import { prisma } from "./db";
import * as crypto from "crypto";

const router = express.Router();

// Basic JSON schema so the frontend can render dynamically (optional)
router.get("/schema", (_req, res) => {
  res.json({
    steps: [
      {
        id: 1,
        title: "Aadhaar Verification",
        fields: [
          { name: "aadhaar", label: "Aadhaar Number", type: "text", pattern: "^\\d{12}$", required: true },
          { name: "applicantName", label: "Name (as in Aadhaar)", type: "text", required: true },
          { name: "mobile", label: "Mobile", type: "text", pattern: "^\\d{10}$", required: true }
        ]
      },
      {
        id: 2,
        title: "PAN Validation",
        fields: [
          { name: "pan", label: "PAN", type: "text", pattern: "^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$", required: true },
          { name: "panName", label: "Name (as per PAN)", type: "text", required: true }
        ]
      }
    ]
  });
});

router.post("/validate/step1", (req, res) => {
  const parsed = AadhaarSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message || "Invalid data" });
  }
  // Simulate OTP sent/verified
  return res.json({ ok: true, message: "Aadhaar format valid. OTP simulated." });
});

router.post("/validate/pan", (req, res) => {
  const parsed = PanSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message || "Invalid data" });
  }
  return res.json({ ok: true, message: "PAN valid." });
});

router.post("/submit", async (req, res) => {
  // Validate again on server
  const a = AadhaarSchema.safeParse({
    aadhaar: req.body?.aadhaar,
    applicantName: req.body?.applicantName,
    mobile: req.body?.mobile
  });
  if (!a.success) return res.status(400).json({ ok: false, error: a.error.issues[0]?.message || "Invalid Aadhaar data" });

  if (req.body?.pan || req.body?.panName) {
    const p = PanSchema.safeParse({ pan: req.body?.pan, panName: req.body?.panName });
    if (!p.success) return res.status(400).json({ ok: false, error: p.error.issues[0]?.message || "Invalid PAN data" });
  }

  const aadhaarHash = crypto.createHash("sha256").update(String(req.body.aadhaar)).digest("hex");

  try {
    const rec = await prisma.submission.create({
      data: {
        aadhaarHash,
        applicantName: String(req.body.applicantName),
        mobile: String(req.body.mobile),
        pan: req.body?.pan ? String(req.body.pan) : null,
        panName: req.body?.panName ? String(req.body.panName) : null
      }
    });
    return res.json({ ok: true, id: rec.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Failed to save submission" });
  }
});

export default router;

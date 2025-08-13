import { z } from "zod";

export const AadhaarSchema = z.object({
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  applicantName: z.string().min(2, "Name is required"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be 10 digits")
});

export const PanSchema = z.object({
  pan: z.string().regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Invalid PAN format"),
  panName: z.string().min(2, "PAN holder name is required")
});

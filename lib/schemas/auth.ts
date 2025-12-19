import { z } from "zod";

// Regex Helpers
const phoneRegex = /^\d{10}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const cinRegex = /^[A-Z0-9]{21}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// --- Step 1: Personal Information ---
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(phoneRegex, "Mobile number must be 10 digits"),
    password: z.string().min(12, "Password must be at least 12 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// --- Step 2: OTP Verification ---
export const otpSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6, "OTP must be 6 digits"),
});

// --- Step 3: Organization Details ---
export const orgSchema = z.object({
  orgName: z.string().min(1, "Organization name is required"),
  cin: z.string().regex(cinRegex, "CIN must be 21 alphanumeric characters"),
  companyPan: z.string().regex(panRegex, "Invalid PAN format"),
  gstNumber: z
    .string()
    .optional()
    .refine((val) => !val || gstRegex.test(val), {
      message: "Invalid GST format",
    }),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type OtpValues = z.infer<typeof otpSchema>;
export type OrgValues = z.infer<typeof orgSchema>;
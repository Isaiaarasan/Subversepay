"use server";

import { createClient } from "@/lib/supabase/server";
import { registerSchema, otpSchema, orgSchema } from "@/lib/schemas/auth";
import { revalidatePath } from "next/cache";

export type ActionState = {
  error?: string;
  success?: boolean;
  message?: string;
  data?: any;
};

// Step 1: Register User 
export async function registerUserAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: "Invalid form data. Please check your inputs." };
  }

  const { email, password, firstName, lastName, mobile } = validated.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        mobile: `+91${mobile}`, 
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If user already exists and is confirmed, signUp might return a session immediately.
  // We handle the standard "unconfirmed" case where OTP is sent.
  if (data?.user && data?.user?.identities?.length === 0) {
    return { error: "This email is already registered." };
  }
  console.log("Registration Data:", data);

  return { 
    success: true, 
    message: "Verification code sent to email.",
    data: { email } 
  };
}

// Step 2: Verify OTP
export async function verifyOtpAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const rawData = Object.fromEntries(formData);
  const validated = otpSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: "Invalid code format." };
  }

  const { email, code } = validated.data;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "signup", 
  });

  console.log("OTP Verification Data:", data);

  if (error) {
    return { error: error.message || "Invalid or expired code." };
  }

  return { success: true, message: "Email verified successfully." };
}

// Step 3: Create Organization
export async function createOrgAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();

  // 1. Check Authentication (Session should exist from Step 2)
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log("Authenticated User:", user);
  if (authError || !user) {
    return { error: "Session expired. Please log in again." };
  }

  // 2. Validate Fields
  const rawData = Object.fromEntries(formData);
  const validated = orgSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: "Invalid organization details." };
  }

  const { orgName, cin, companyPan, gstNumber } = validated.data;

  // 3. Handle Files
  const incorporationCert = formData.get("incorporationCert") as File;
  const panImage = formData.get("panImage") as File;
  const gstCertificate = formData.get("gstCertificate") as File;

  if (!incorporationCert || !panImage) {
    return { error: "Required documents are missing." };
  }

  let orgId: string | null = null;
  const uploadedPaths: string[] = [];

  try {
    const uploadFile = async (file: File, folder: string) => {
      const ext = file.name.split(".").pop();
      const cleanOrg = orgName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      // Path format: userId/orgName_timestamp.ext
      const path = `${folder}/${user.id}/${cleanOrg}_${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from("org-docs")
        .upload(path, file);
      
      if (error) throw error;
      uploadedPaths.push(path);
      return path;
    };

    const incPath = await uploadFile(incorporationCert, "incorporation-certificates");
    const panPath = await uploadFile(panImage, "company-pan");
    const gstPath = (gstNumber && gstCertificate?.size > 0) 
      ? await uploadFile(gstCertificate, "gst-certificates") 
      : null;

    // 4. Create Org
    const { data: orgData, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name: orgName,
        cin: cin.toUpperCase(),
        inc_cert_path: incPath,
        company_pan: companyPan.toUpperCase(),
        company_pan_path: panPath,
        gst_number: gstNumber?.toUpperCase() || null,
        gst_cert_path: gstPath,
        created_by: user.id,
         status: 'pending',
      })
      .select()
      .single();

    if (orgError) throw orgError;
    orgId = orgData.id;

    // 5. Assign Role 
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: user.id,
      role_id: 2, // Admin Role
    });
    if (roleError) throw roleError;
    await supabase.auth.signOut();

  } catch (error: any) {
    console.error("Org Creation Error:", error);
    
    // Rollback Files
    if (uploadedPaths.length > 0) {
      await supabase.storage.from("org-docs").remove(uploadedPaths);
    }
    // Rollback Org
    if (orgId) {
      await supabase.from("organizations").delete().eq("id", orgId);
    }

    return { error: error.message || "Failed to create organization." };
  }

  return { success: true, message: "Organization setup complete." };
}
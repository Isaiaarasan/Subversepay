"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, otpSchema, orgSchema, RegisterValues, OtpValues, OrgValues } from "@/lib/schemas/auth";
import { registerUserAction, verifyOtpAction, createOrgAction } from "@/app/auth/sign-up/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "sonner"; 
import { Loader2, ArrowRight } from "lucide-react";

import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";

export function SignUpWrapper() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();

  // --- Form Definitions ---
  const form1 = useForm<RegisterValues>({ 
    resolver: zodResolver(registerSchema), 
    defaultValues: { firstName: "", lastName: "", email: "", mobile: "", password: "", confirmPassword: "" }
  });
  
  const form2 = useForm<OtpValues>({ 
    resolver: zodResolver(otpSchema), 
    defaultValues: { email: "", code: "" }
  });
  
  const form3 = useForm<OrgValues>({ 
    resolver: zodResolver(orgSchema), 
    defaultValues: { orgName: "", cin: "", companyPan: "", gstNumber: "" }
  });

  // --- Handlers ---
  
  // Step 1: Sign Up
  const onStep1Submit = (data: RegisterValues) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      
      const result = await registerUserAction({}, formData);
      
      if (result.error) {
        toast.error("Sign Up Failed", { description: result.error });
      } else {
        setEmail(data.email);
        form2.setValue("email", data.email); 
        setStep(2);
        toast.success("Account Created", { description: result.message });
      }
    });
  };

  // Step 2: Verify OTP
  const onStep2Submit = (data: OtpValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", data.code);

      const result = await verifyOtpAction({}, formData);
      
      if (result.error) {
        toast.error("Verification Failed", { description: result.error });
      } else {
        setStep(3);
        toast.success("Email Verified", { description: "Please complete your organization profile." });
      }
    });
  };

  // Step 3: Create Org
  const onStep3Submit = (data: OrgValues) => {
    const errors: Record<string, string> = {};
    if (!files.incorporationCert) errors.incorporationCert = "Certificate required";
    if (!files.panImage) errors.panImage = "PAN image required";
    if (data.gstNumber && !files.gstCertificate) errors.gstCertificate = "GST Cert required";
    
    if (Object.keys(errors).length > 0) {
      setFileErrors(errors);
      toast.error("Missing Documents", { description: "Please upload all required files." });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => { if(v) formData.append(k, v) });
      if (files.incorporationCert) formData.append("incorporationCert", files.incorporationCert);
      if (files.panImage) formData.append("panImage", files.panImage);
      if (files.gstCertificate) formData.append("gstCertificate", files.gstCertificate);

      const result = await createOrgAction({}, formData);
      
      if (result.error) {
        toast.error("Setup Failed", { description: result.error });
      } else {
        toast.success("Submission Received", { 
          description: "Your organization is under verification. You can login once approved." 
        });
        // Redirect to login page with status param for banner
        router.push("/auth/login?status=pending"); 
      }
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-2xl font-bold">
            {step === 1 && "Create Account"}
            {step === 2 && "Verify Email"}
            {step === 3 && "Organization Setup"}
          </CardTitle>
          <span className="text-xs font-semibold bg-secondary px-2 py-1 rounded">
            Step {step}/3
          </span>
        </div>
        <CardDescription>
          {step === 1 && "Start by creating your admin account."}
          {step === 2 && "Enter the verification code sent to your email."}
          {step === 3 && "Upload your business documents securely."}
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-4">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {step === 1 && (
          <Form {...form1}>
            <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
              <StepOne form={form1} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {isPending ? "Sending OTP..." : "Sign Up & Get OTP"}
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
              <StepTwo form={form2} email={email} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {isPending ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...form3}>
            <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
              <StepThree 
                form={form3} 
                onFileChange={(k, f) => setFiles(p => ({...p, [k]: f}))} 
                fileErrors={fileErrors} 
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {isPending ? "Submitting..." : <span className="flex items-center gap-2">Submit for Verification <ArrowRight className="w-4 h-4" /></span>}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
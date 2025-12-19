import { SignUpWrapper } from "@/components/sign-up/signup-wrapper";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/20">
      <div className="w-full max-w-lg mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Subverse Pay
        </h1>
        <p className="text-muted-foreground">
          Join the infrastructure for the modern economy.
        </p>
      </div>

      <SignUpWrapper />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link 
          href="/auth/login" 
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
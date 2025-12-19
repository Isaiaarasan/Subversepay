import { UseFormReturn } from "react-hook-form";
import { OtpValues } from "@/lib/schemas/auth";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export function StepTwo({ form, email }: { form: UseFormReturn<OtpValues>; email: string }) {
  return (
    <div className="space-y-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-right-4">
      <div className="space-y-1 mb-2">
        <h3 className="font-semibold text-lg">Verification Code</h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to <span className="text-foreground font-medium">{email}</span>
        </p>
      </div>

      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">OTP</FormLabel>
            <FormControl>
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
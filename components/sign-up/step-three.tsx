import { UseFormReturn } from "react-hook-form";
import { OrgValues } from "@/lib/schemas/auth";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUploader } from "./file-uploader";

interface StepThreeProps {
  form: UseFormReturn<OrgValues>;
  onFileChange: (key: string, file: File | null) => void;
  fileErrors: Record<string, string>;
}

export function StepThree({ form, onFileChange, fileErrors }: StepThreeProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
      <FormField
        control={form.control}
        name="orgName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl><Input placeholder="Acme Inc." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CIN</FormLabel>
              <FormControl><Input placeholder="21-digit Code" maxLength={21} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyPan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company PAN</FormLabel>
              <FormControl><Input placeholder="ABCDE1234F" maxLength={10} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-3 pt-2">
        <FileUploader 
          id="inc-cert" 
          label="Incorporation Certificate" 
          required 
          onFileSelect={(f) => onFileChange("incorporationCert", f)} 
          error={fileErrors.incorporationCert}
        />
        <FileUploader 
          id="pan-image" 
          label="PAN Card Image" 
          required 
          onFileSelect={(f) => onFileChange("panImage", f)} 
          error={fileErrors.panImage}
        />
      </div>

      <FormField
        control={form.control}
        name="gstNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GST Number (Optional)</FormLabel>
            <FormControl><Input placeholder="15-digit GST" maxLength={15} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("gstNumber") && (
        <FileUploader 
          id="gst-cert" 
          label="GST Certificate" 
          required 
          onFileSelect={(f) => onFileChange("gstCertificate", f)} 
          error={fileErrors.gstCertificate}
        />
      )}
    </div>
  );
}
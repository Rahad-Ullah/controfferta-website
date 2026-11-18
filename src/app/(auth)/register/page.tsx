"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nextFetch } from "@/lib/api/fetcher";
import { registerFieldErrors, registerFields } from "@/schemas/register";

const emptyForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

type FormState = typeof emptyForm;

function fieldClass(invalid: boolean, withToggle = false) {
  const padding = withToggle ? "pl-4 pr-11" : "px-4";
  return invalid
    ? `h-11 rounded-full border-red-400 bg-white ${padding} text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-red-500 focus-visible:ring-0`
    : `h-11 rounded-full border-slate-200 bg-white ${padding} text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:border-[#00BC7D] focus-visible:ring-0`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 px-2 text-xs text-red-600">{message}</p>;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "register-company",
    (_key: string, { arg }: { arg: Record<string, unknown> }) =>
      nextFetch<{ message?: string }>({ url: "/users/register", method: "POST", payload: arg }),
  );

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");

    const result = registerFields.safeParse(formData);
    if (!result.success) {
      setErrors(registerFieldErrors(result.error));
      return;
    }

    try {
      const response = await trigger(
        {
          role: "provider",
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          password: result.data.password,
          businessName: result.data.company,
        },
        { throwOnError: true },
      );
      toast.success(response?.message || "Account created. Check your email to verify it.");
      router.push(`/verify-otp?email=${encodeURIComponent(result.data.email)}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not create your account.");
    }
  };

  return (
    <Card className="w-full max-w-[440px] gap-0 rounded-[28px] bg-white px-6 py-7 text-slate-900 shadow-2xl ring-0 sm:px-8 sm:py-8">
      <div className="mb-6 flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="size-8 text-slate-700 hover:bg-transparent hover:text-slate-900"
          aria-label="Go back"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-lg font-bold">Register your company</h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName" className="mb-1.5 px-1 font-normal text-slate-600">
              First Name
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="Marco"
              autoComplete="given-name"
              aria-invalid={Boolean(errors.firstName)}
              className={fieldClass(Boolean(errors.firstName))}
            />
            <FieldError message={errors.firstName} />
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-1.5 px-1 font-normal text-slate-600">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="Ferretti"
              autoComplete="family-name"
              aria-invalid={Boolean(errors.lastName)}
              className={fieldClass(Boolean(errors.lastName))}
            />
            <FieldError message={errors.lastName} />
          </div>
        </div>

        <div>
          <Label htmlFor="company" className="mb-1.5 px-1 font-normal text-slate-600">
            Company
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Ferretti Serramenti Srl"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            className={fieldClass(Boolean(errors.company))}
          />
          <FieldError message={errors.company} />
        </div>

        <div>
          <Label htmlFor="email" className="mb-1.5 px-1 font-normal text-slate-600">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="marco@ferretti.it"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={fieldClass(Boolean(errors.email))}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <Label htmlFor="password" className="mb-1.5 px-1 font-normal text-slate-600">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={fieldClass(Boolean(errors.password), true)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FieldError message={errors.password} />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="mb-1.5 px-1 font-normal text-slate-600">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              className={fieldClass(Boolean(errors.confirmPassword), true)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FieldError message={errors.confirmPassword} />
        </div>

        <div>
          <Label className="items-start gap-2.5 px-1 font-normal text-slate-600">
            <Checkbox
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => updateField("termsAccepted", checked === true)}
              aria-invalid={Boolean(errors.termsAccepted)}
              className="mt-0.5 border-slate-300 bg-white data-checked:border-[#00BC7D] data-checked:bg-[#00BC7D] data-checked:text-white"
            />
            <span>
              I accept the{" "}
              <Link href="/terms" className="font-medium text-[#00BC7D] hover:underline">
                Terms of Service
              </Link>{" "}
              and the{" "}
              <Link href="/privacy" className="font-medium text-[#00BC7D] hover:underline">
                Privacy Policy
              </Link>
            </span>
          </Label>
          <FieldError message={errors.termsAccepted} />
        </div>

        {submitError ? <p className="px-2 text-sm text-red-600">{submitError}</p> : null}

        <button
          type="submit"
          disabled={isMutating}
          className="flex h-11 w-full items-center justify-center rounded-full bg-[#00D492] text-sm font-semibold text-white transition-colors hover:bg-[#00BC7D] disabled:opacity-60"
        >
          {isMutating ? <Loader2 className="size-4 animate-spin" /> : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-[#00BC7D] hover:underline">
          Sign In
        </Link>
      </p>
    </Card>
  );
}

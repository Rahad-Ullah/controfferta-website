"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { nextFetch } from "@/lib/api/fetcher";
import { contactFieldErrors, contactFields } from "@/schemas/contact";
import type { Support, SupportCreate } from "@/types/support.interface";
import { apiKeys } from "@/lib/api/keys";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

const fieldClassName =
  "h-auto w-full rounded-xl border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 shadow-none placeholder:text-zinc-400 focus-visible:border-[#00BC7D] focus-visible:ring-0 sm:text-sm";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    apiKeys.supports,
    (_: string, { arg }: { arg: SupportCreate }) =>
      nextFetch<{ data: Support }>({ url: "/supports/create", method: "POST", payload: arg })
  );
  const [formData, setFormData] = useState(emptyForm);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const result = contactFields.safeParse(formData);
    if (!result.success) {
      setErrors(contactFieldErrors(result.error));
      return;
    }

    try {
      await trigger(result.data, { throwOnError: true });
      setSenderName(`${result.data.firstName} ${result.data.lastName}`);
      setFormData(emptyForm);
      setErrors({});
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not send your message.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">
          Message Sent Successfully!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
          Thank you for reaching out, <span className="font-semibold text-slate-800">{senderName}</span>. A member of our support team will reply to you shortly.
        </p>
        <Button
          type="button"
          onClick={() => {
            setSubmitError("");
            setSubmitted(false);
          }}
          className="h-auto rounded-xl bg-[#00BC7D] px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#00d68f] sm:text-sm"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
        Send Us a Message
      </h3>
      <p className="text-xs sm:text-sm text-zinc-500 mt-1">
        Fill out the form below and we will get back to you within 24 hours.
      </p>

      <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block text-xs font-semibold text-slate-700">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              aria-invalid={Boolean(errors.firstName)}
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Marco"
              className={fieldClassName}
            />
            <FieldError message={errors.firstName} />
          </div>
          <div>
            <Label className="mb-1 block text-xs font-semibold text-slate-700">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              aria-invalid={Boolean(errors.lastName)}
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Rossi"
              className={fieldClassName}
            />
            <FieldError message={errors.lastName} />
          </div>
        </div>

        <div>
          <Label className="mb-1 block text-xs font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            aria-invalid={Boolean(errors.email)}
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="marco@example.com"
            className={fieldClassName}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <Label className="mb-1 block text-xs font-semibold text-slate-700">
            Subject <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            aria-invalid={Boolean(errors.subject)}
            value={formData.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            placeholder="Inquiry about lead generation / requests..."
            className={fieldClassName}
          />
          <FieldError message={errors.subject} />
        </div>

        <div>
          <Label className="mb-1 block text-xs font-semibold text-slate-700">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            rows={5}
            aria-invalid={Boolean(errors.message)}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="How can we help you today?"
            className={`${fieldClassName} min-h-28 resize-none`}
          />
          <FieldError message={errors.message} />
        </div>

        {submitError ? <p className="text-xs text-red-600">{submitError}</p> : null}

        <Button
          type="submit"
          disabled={isMutating}
          className="mt-2 h-auto w-full rounded-xl bg-[#00BC7D] py-3.5 text-xs font-semibold text-white shadow-md hover:bg-[#00d68f] sm:text-sm cursor-pointer"
        >
          <Send className="size-4" />
          {isMutating ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}

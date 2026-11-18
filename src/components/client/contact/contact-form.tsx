"use client";

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import { contactFieldErrors, contactFields } from "@/schemas/contact";
import type { Support, SupportCreate } from "@/types/support.interface";

const subjects = [
  "General information",
  "Submitting a request",
  "Quotes",
  "Becoming a company",
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: subjects[0],
  message: "",
};

const fieldClassName =
  "w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#00BC7D]";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 px-2 text-xs text-red-600">{message}</p>;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const { trigger, isMutating } = useSWRMutation(
    apiKeys.supports,
    (_url: string, { arg }: { arg: SupportCreate }) =>
      nextFetch<{ data: Support }>({ url: "/supports/create", method: "POST", payload: arg }),
  );

  const updateField = (field: keyof typeof formData, value: string) => {
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
      <div className="py-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-[#00BC7D]">
          <CheckCircle2 className="size-7" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-slate-900">Message sent</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          Thank you, {senderName}. A member of our support team will reply to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-[#00BC7D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#00a36d]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Write to us</h2>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="client-first-name" className="mb-2 block text-sm text-slate-600">
              First Name *
            </label>
            <input
              id="client-first-name"
              type="text"
              value={formData.firstName}
              aria-invalid={Boolean(errors.firstName)}
              onChange={(event) => updateField("firstName", event.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.firstName} />
          </div>
          <div>
            <label htmlFor="client-last-name" className="mb-2 block text-sm text-slate-600">
              Last Name *
            </label>
            <input
              id="client-last-name"
              type="text"
              value={formData.lastName}
              aria-invalid={Boolean(errors.lastName)}
              onChange={(event) => updateField("lastName", event.target.value)}
              className={fieldClassName}
            />
            <FieldError message={errors.lastName} />
          </div>
        </div>

        <div>
          <label htmlFor="client-email" className="mb-2 block text-sm text-slate-600">
            Email *
          </label>
          <input
            id="client-email"
            type="email"
            value={formData.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => updateField("email", event.target.value)}
            className={fieldClassName}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <label htmlFor="client-subject" className="mb-2 block text-sm text-slate-600">
            Subject
          </label>
          <div className="relative">
            <select
              id="client-subject"
              value={formData.subject}
              aria-invalid={Boolean(errors.subject)}
              onChange={(event) => updateField("subject", event.target.value)}
              className={`${fieldClassName} appearance-none pr-10`}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-400" />
          </div>
          <FieldError message={errors.subject} />
        </div>

        <div>
          <label htmlFor="client-message" className="mb-2 block text-sm text-slate-600">
            Message *
          </label>
          <textarea
            id="client-message"
            rows={5}
            value={formData.message}
            aria-invalid={Boolean(errors.message)}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Describe your request..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#00BC7D]"
          />
          <FieldError message={errors.message} />
        </div>

        {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

        <button
          type="submit"
          disabled={isMutating}
          className="w-full rounded-full bg-[#00BC7D] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00a36d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isMutating ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

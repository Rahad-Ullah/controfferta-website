"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  Wrench,
  CalendarClock,
  MapPin,
  AlertTriangle,
  User,
  Mail,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fieldErrors, parseBudget, requestFields, stepFields } from "@/schemas/submit-request";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { nextFetch } from "@/lib/api/fetcher";
import { apiKeys } from "@/lib/api/keys";
import type { Category, CategoryPagination } from "@/types/category.interface";
import type { Lead, LeadCreate } from "@/types/lead.interface";

const fieldClassName =
  "h-auto w-full rounded-xl border-slate-300/80 bg-[#E5E9EC] px-4 py-3 text-xs text-slate-800 shadow-none placeholder:text-zinc-400 hover:bg-[#dfe4e8] focus-visible:border-[#00BC7D] focus-visible:ring-0 data-[size=default]:h-auto sm:text-sm";

const contactFieldClassName =
  "h-auto w-full rounded-xl border-slate-300/80 bg-[#ECEFF2] py-2.5 pl-11 text-xs text-slate-800 shadow-none placeholder:text-zinc-400 focus-visible:border-[#00BC7D] focus-visible:ring-0 sm:text-sm";

function StepActions({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 border-t border-slate-300/60 pt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="h-auto rounded-full border-slate-300 bg-[#D9DFE4] px-9 py-2.5 text-xs font-semibold text-slate-700 hover:bg-[#cfd6dc] sm:text-sm"
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={onContinue}
        className="h-auto rounded-full bg-[#00BC7D] px-9 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#00d68f] sm:text-sm"
      >
        Continue
      </Button>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function formatBudget(min: string, max: string) {
  const low = min.trim();
  const high = max.trim();
  if (low && high) return `€${low} – €${high}`;
  if (low) return `From €${low}`;
  if (high) return `Up to €${high}`;
  return "";
}

function regionForLocation(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("brescia") || normalized.includes("milan")) return "Lombardy";
  if (normalized.includes("rome")) return "Lazio";
  return "";
}

export default function SubmitRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [requestRef, setRequestRef] = useState<string>("");

  // Form State
  const [category, setCategory] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const [timeline, setTimeline] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budgetMin, setBudgetMin] = useState<string>("");
  const [budgetMax, setBudgetMax] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+39");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const { trigger, isMutating } = useSWRMutation(
    apiKeys.leads,
    (_: string, { arg }: { arg: LeadCreate }) =>
      nextFetch<{ data: Lead }>({ url: '/leads/create', method: "POST", payload: arg })
  );

  useEffect(() => {
    const requestedCategory = searchParams.get("category");
    if (!requestedCategory) return;
    setCategory(requestedCategory);
    setServiceName("");
  }, [searchParams]);

  const { data: categoryList, error: categoryError, isLoading: categoriesLoading } =
    useSWR<{ data?: Category[]; pagination?: CategoryPagination }>(
      apiKeys.categories
    );
  const categories = Array.isArray(categoryList?.data) ? categoryList.data : [];
  const categoryOptions =
    category && !categories.some((item) => item.name === category)
      ? [{ _id: category, name: category }, ...categories]
      : categories;

  const timelines = [
    "As soon as possible",
    "Within 1 month",
    "Within 3 months",
    "Flexible / Just exploring",
  ];

  const clearFieldError = (field: string) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleNext = () => {
    const fields = stepFields[currentStep as 1 | 2];
    if (!fields) return;

    const result = requestFields.safeParse({
      category,
      serviceName,
      description,
      timeline,
      location,
      budgetMin,
      budgetMax,
      fullName,
      email,
      phoneNumber,
      agreedToTerms,
    });

    if (!result.success) {
      const nextErrors = fieldErrors(result.error, fields);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
    }

    setErrors({});
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const result = requestFields.safeParse({
      category,
      serviceName,
      description,
      timeline,
      location,
      budgetMin,
      budgetMax,
      fullName,
      email,
      phoneNumber,
      agreedToTerms,
    });

    if (!result.success) {
      const step3Errors = fieldErrors(result.error, stepFields[3]);
      if (Object.keys(step3Errors).length > 0) {
        setErrors(step3Errors);
        return;
      }

      const earlierStep = ([1, 2] as const).find((step) => {
        return Object.keys(fieldErrors(result.error, stepFields[step])).length > 0;
      });
      if (earlierStep) {
        setErrors(fieldErrors(result.error, stepFields[earlierStep]));
        setCurrentStep(earlierStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const selectedCategory = categories.find((item) => item.name === category);
    const minimum = parseBudget(budgetMin);
    const maximum = parseBudget(budgetMax);
    if (!selectedCategory || Number.isNaN(minimum) || Number.isNaN(maximum)) {
      setSubmitError("Choose a service category and enter a budget range.");
      return;
    }

    const payload: LeadCreate = {
      category: selectedCategory._id,
      title: serviceName.trim(),
      description: description.trim(),
      address: location.trim(),
      budgetRange: { minimum, maximum },
      timeline: timeline.trim(),
      client: {
        name: fullName.trim(),
        email: email.trim(),
        phone: {
          countryCode,
          number: phoneNumber.trim(),
        },
        address: location.trim(),
      },
    };

    try {
      const body = await trigger(payload, { throwOnError: true });
      setErrors({});
      setRequestRef(body?.data?.uid ?? "");
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your request.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEFF2] text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      {/* 1. Header / Navbar */}

      {/* Main Request Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {!isSuccess ? (
          <div>
            {/* Top Heading */}
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight">
                {currentStep === 3
                  ? "Review Your Request"
                  : "Find the right professional for your project"}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
                {currentStep === 3
                  ? "Verify your project details and enter your contact information."
                  : "Tell us what you need in a few quick steps. Fast, free quotes from certified contractors."}
              </p>
            </div>

            {/* 3-Step Progress Bar */}
            <div className="w-full max-w-2xl mx-auto bg-slate-300/70 h-1.5 rounded-full overflow-hidden mb-10">
              <motion.div
                className="bg-[#00BC7D] h-full rounded-full transition-all duration-500"
                style={{
                  width:
                    currentStep === 1
                      ? "33%"
                      : currentStep === 2
                        ? "66%"
                        : "100%",
                }}
              />
            </div>

            {/* STEP 1: Service Category, Service Name, Description */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Field 1: Category */}
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm">
                    Which service category are you interested in? <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={category || null}
                    disabled={categoriesLoading}
                    onValueChange={(value) => {
                      if (!value) return;
                      setCategory(value);
                      clearFieldError("category");
                    }}
                  >
                    <SelectTrigger className={fieldClassName}>
                      <SelectValue
                        placeholder={categoriesLoading ? "Loading categories..." : "Select a category"}
                      />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      alignItemWithTrigger={false}
                      className="p-1"
                      style={{ width: "14rem" }}
                    >
                      {categoryOptions.map((item) => (
                        <SelectItem key={item._id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError message={errors.category} />
                  {categoryError ? (
                    <p className="mt-1.5 text-xs text-red-600">Could not load categories.</p>
                  ) : !categoriesLoading && categories.length === 0 ? (
                    <p className="mt-1.5 text-xs text-zinc-500">No categories yet.</p>
                  ) : null}
                </div>

                {/* Field 2: Specific Service */}
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm">
                    What service do you need? <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Wrench className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      type="text"
                      required
                      aria-invalid={Boolean(errors.serviceName)}
                      value={serviceName}
                      onChange={(e) => {
                        setServiceName(e.target.value);
                        clearFieldError("serviceName");
                      }}
                      placeholder="e.g. Solar panel installation"
                      className={`${fieldClassName} pl-11`}
                    />
                  </div>
                  <FieldError message={errors.serviceName} />
                </div>

                {/* Field 3: Description */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-xs font-semibold text-slate-800 sm:text-sm">
                      Briefly describe what you need <span className="text-red-500">*</span>
                    </Label>
                    <span className="text-[11px] font-medium text-zinc-400">
                      {description.length} / 500 characters
                    </span>
                  </div>
                  <Textarea
                    rows={4}
                    required
                    maxLength={500}
                    aria-invalid={Boolean(errors.description)}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      clearFieldError("description");
                    }}
                    placeholder="Tell us about your project or requirements... (e.g. 6kW rooftop system with hybrid inverter, pitched clay tile roof, need site inspection)"
                    className={`${fieldClassName} min-h-28 resize-none leading-relaxed`}
                  />
                  <FieldError message={errors.description} />
                </div>

                <StepActions onBack={handleBack} onContinue={handleNext} />
              </motion.div>
            )}

            {/* STEP 2: Timeline, Location, Estimated Budget */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                {/* Field 1: Timeline */}
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm">
                    When do you need the service? <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarClock className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-zinc-400" />
                    <Select
                      value={timeline || null}
                      onValueChange={(value) => {
                        if (!value) return;
                        setTimeline(value);
                        clearFieldError("timeline");
                      }}
                    >
                      <SelectTrigger className={`${fieldClassName} pl-11`}>
                        <SelectValue placeholder="Choose a timeline" />
                      </SelectTrigger>
                      <SelectContent
                        align="start"
                        alignItemWithTrigger={false}
                        className="p-1"
                        style={{ width: "14rem" }}
                      >
                        {timelines.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FieldError message={errors.timeline} />
                </div>

                {/* Field 2: Location */}
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm">
                    Where is it needed? <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      type="text"
                      required
                      aria-invalid={Boolean(errors.location)}
                      value={location}
                      onChange={(e) => {
                        const nextLocation = e.target.value;
                        setLocation(nextLocation);
                        clearFieldError("location");
                        const nextRegion = regionForLocation(nextLocation);
                        if (nextRegion) setRegion(nextRegion);
                      }}
                      placeholder="e.g. Brescia, Italy"
                      className={`${fieldClassName} pl-11`}
                    />
                  </div>
                  <FieldError message={errors.location} />
                </div>

                {/* Field 3: Estimated Budget */}
                <div>
                  <Label className="mb-2 block text-xs font-semibold text-slate-800 sm:text-sm">
                    Estimated Budget
                  </Label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <Label className="mb-1.5 block text-[11px] font-medium text-zinc-500">
                        Min <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold text-slate-500">
                          €
                        </span>
                        <Input
                          type="text"
                          inputMode="decimal"
                          required
                          aria-invalid={Boolean(errors.budgetMin)}
                          value={budgetMin}
                          onChange={(e) => {
                            setBudgetMin(e.target.value);
                            clearFieldError("budgetMin");
                            clearFieldError("budgetMax");
                          }}
                          placeholder="5,000"
                          className={`${fieldClassName} pl-9`}
                        />
                      </div>
                      <FieldError message={errors.budgetMin} />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-[11px] font-medium text-zinc-500">
                        Max <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm font-bold text-slate-500">
                          €
                        </span>
                        <Input
                          type="text"
                          inputMode="decimal"
                          required
                          aria-invalid={Boolean(errors.budgetMax)}
                          value={budgetMax}
                          onChange={(e) => {
                            setBudgetMax(e.target.value);
                            clearFieldError("budgetMin");
                            clearFieldError("budgetMax");
                          }}
                          placeholder="10,000"
                          className={`${fieldClassName} pl-9`}
                        />
                      </div>
                      <FieldError message={errors.budgetMax} />
                    </div>
                  </div>
                </div>

                <StepActions onBack={handleBack} onContinue={handleNext} />
              </motion.div>
            )}

            {/* STEP 3: Review Your Request & Contact Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Request Summary Card */}
                <div className="lg:col-span-5 bg-[#E2E6E9] rounded-2xl p-6 border border-slate-300/70 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-300/60">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
                      <FileText className="w-4 h-4 text-[#00BC7D]" />
                      <span>Request Summary</span>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setCurrentStep(1)}
                      className="h-auto p-0 text-xs font-semibold text-[#00BC7D]"
                    >
                      ← Edit Request
                    </Button>
                  </div>

                  {/* Service */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50">
                    <span className="text-[11px] font-medium text-zinc-500 block">
                      Service
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {serviceName || category}
                    </span>
                  </div>

                  {/* Location & Region */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-zinc-500 block">
                        Location
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                        {location}
                      </span>
                    </div>
                    {region && (
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {region}
                      </span>
                    )}
                  </div>

                  {/* Estimated Budget */}
                  <div className="bg-[#ECEFF2] p-3 rounded-xl border border-slate-300/50">
                    <span className="text-[11px] font-medium text-zinc-500 block">
                      Estimated Budget
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#00BC7D] block mt-0.5">
                      {formatBudget(budgetMin, budgetMax)}
                    </span>
                  </div>

                  {/* Pills row (Category & Urgency) */}
                  <div className="flex items-center gap-2 pt-1">
                    <Badge className="h-auto rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800">
                      {category}
                    </Badge>
                    <Badge className="h-auto rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                      {timeline}
                    </Badge>
                  </div>

                  {/* Project Scope & Requirements */}
                  <div className="bg-[#ECEFF2] p-3.5 rounded-xl border border-slate-300/50 space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-500 block">
                      Project Scope &amp; Requirements
                    </span>
                    <p className="text-xs text-zinc-600 italic leading-relaxed">
                      &quot;{description}&quot;
                    </p>
                  </div>
                </div>

                {/* Right Column: Contact Details & Submit */}
                <div className="lg:col-span-7 bg-[#E2E6E9] rounded-2xl p-6 sm:p-7 border border-slate-300/70 space-y-5">
                  {/* Warning Notice Banner */}
                  <div className="bg-[#FFF8E6] border border-amber-300/60 text-amber-900 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 text-xs font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      This data will be visible to buyers only after the lead is unlocked.
                    </span>
                  </div>

                  <form noValidate onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label className="text-xs font-semibold text-slate-800">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <span className="text-[11px] text-zinc-400">
                          Legal or contact person
                        </span>
                      </div>
                      <div className="relative">
                        <User className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                          type="text"
                          aria-invalid={Boolean(errors.fullName)}
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            clearFieldError("fullName");
                          }}
                          placeholder="Marco Rossi"
                          className={contactFieldClassName}
                        />
                      </div>
                      <FieldError message={errors.fullName} />
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label className="text-xs font-semibold text-slate-800">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <span className="text-[11px] text-zinc-400">
                          Detailed quotes sent here
                        </span>
                      </div>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                          type="email"
                          aria-invalid={Boolean(errors.email)}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearFieldError("email");
                          }}
                          placeholder="m.rossi@residenzabrescia.it"
                          className={contactFieldClassName}
                        />
                      </div>
                      <FieldError message={errors.email} />
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label className="text-xs font-semibold text-slate-800">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <span className="text-[11px] text-zinc-400">
                          For quote dispatch SMS
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={countryCode}
                          items={[{ value: "+39", label: "🇮🇹 +39" }]}
                          onValueChange={(value) => value && setCountryCode(value)}
                        >
                          <SelectTrigger className="h-auto w-28 shrink-0 rounded-xl border-slate-300/80 bg-[#ECEFF2] px-3 py-2.5 text-xs font-semibold text-slate-800 shadow-none focus-visible:border-[#00BC7D] focus-visible:ring-0 data-[size=default]:h-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+39">🇮🇹 +39</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="tel"
                          aria-invalid={Boolean(errors.phoneNumber)}
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            clearFieldError("phoneNumber");
                          }}
                          placeholder="335 128 9942"
                          className="h-auto rounded-xl border-slate-300/80 bg-[#ECEFF2] px-4 py-2.5 text-xs text-slate-800 shadow-none focus-visible:border-[#00BC7D] focus-visible:ring-0 sm:text-sm"
                        />
                      </div>
                      <FieldError message={errors.phoneNumber} />
                    </div>

                    <div className="flex items-start gap-2.5 pt-2">
                      <Checkbox
                        id="terms"
                        required
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => {
                          setAgreedToTerms(checked);
                          clearFieldError("agreedToTerms");
                        }}
                        className="mt-0.5 border-slate-400 bg-white data-checked:border-[#00BC7D] data-checked:bg-[#00BC7D] data-checked:text-white"
                      />
                      <Label htmlFor="terms" className="cursor-pointer text-xs leading-snug font-normal text-zinc-600">
                        I agree to the{" "}
                        <span className="font-semibold text-slate-800 underline">
                          Terms &amp; Conditions
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-slate-800 underline">
                          Privacy Policy
                        </span>
                        .
                      </Label>
                    </div>
                    <FieldError message={errors.agreedToTerms} />

                    {submitError ? (
                      <p className="text-xs text-red-600">{submitError}</p>
                    ) : null}

                    <div className="pt-3">
                      <Button
                        type="submit"
                        disabled={isMutating}
                        className="h-auto w-full rounded-xl bg-[#00BC7D] py-3.5 text-xs font-bold text-white shadow-lg hover:bg-[#00d68f] sm:text-sm"
                      >
                        {isMutating ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* SUCCESS CONFIRMATION STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00BC7D] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Request Submitted Successfully!
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Your request for <span className="font-bold text-slate-800">{serviceName}</span> in <span className="font-bold text-slate-800">{location}</span> has been dispatched to certified contractors.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 text-xs text-zinc-600 text-left space-y-1.5 border border-slate-200/70">
              <div className="flex justify-between">
                <span className="text-zinc-400">Request Ref:</span>
                <span className="font-mono font-bold text-slate-800">{requestRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Contact:</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Status:</span>
                <span className="font-bold text-[#00BC7D]">Pending</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                nativeButton={false}
                render={<Link href="/" />}
                className="h-auto flex-1 rounded-xl bg-[#00BC7D] px-5 py-3 text-xs font-semibold text-white shadow-md hover:bg-[#00d68f] sm:text-sm"
              >
                Back to Homepage
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCategory("");
                  setServiceName("");
                  setLocation("");
                  setRegion("");
                  setTimeline("");
                  setDescription("");
                  setBudgetMin("");
                  setBudgetMax("");
                  setFullName("");
                  setEmail("");
                  setPhoneNumber("");
                  setAgreedToTerms(false);
                  setErrors({});
                  setSubmitError("");
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setRequestRef("");
                }}
                className="h-auto flex-1 rounded-xl border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:text-sm"
              >
                Submit Another Request
              </Button>
            </div>
          </motion.div>
        )}
      </main>

    </div>
  );
}


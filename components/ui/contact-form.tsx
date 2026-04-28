"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
  attachment: File | null;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  attachment: null,
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please share a short message.";
    }

    if (form.attachment && form.attachment.size > 5 * 1024 * 1024) {
      nextErrors.message = "Attachment must be 5MB or smaller.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.set("name", form.name);
      payload.set("email", form.email);
      payload.set("message", form.message);

      if (form.attachment) {
        payload.set("attachment", form.attachment);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm(initialState);
      setErrors({});
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "w-full rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-slate-100 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[var(--color-accent-2)] focus:bg-white/[0.06]";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className={inputClassName}
          placeholder="Alex Morgan"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 text-sm text-rose-300">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className={inputClassName}
          placeholder="alex@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-2 text-sm text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          autoComplete="off"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          rows={4}
          className={inputClassName}
          placeholder="Tell us what you are building."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-rose-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="attachment" className="mb-2 block text-sm font-medium text-slate-200">
          Attachment (optional)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          onChange={(event) =>
            setForm((prev) => ({ ...prev, attachment: event.target.files?.[0] ?? null }))
          }
          className="w-full rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 file:mr-3 file:rounded-lg file:border-0 file:bg-white/12 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-100 hover:file:bg-white/20"
          aria-describedby="attachment-hint"
        />
        <p id="attachment-hint" className="mt-2 text-xs text-slate-400">
          Max size 5MB. Supported: PDF, DOC, DOCX, TXT, PNG, JPG.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {submitError ? (
        <p role="alert" className="text-sm text-rose-300">
          {submitError}
        </p>
      ) : null}

      {submitted ? (
        <p role="status" aria-live="polite" className="text-sm text-emerald-300">
          Thanks! We will get back to you shortly.
        </p>
      ) : null}
    </form>
  );
}

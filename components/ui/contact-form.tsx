"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!validate()) {
      return;
    }

    setSubmitted(true);
    setForm(initialState);
    setErrors({});
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

      <button
        type="submit"
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        Send message
      </button>

      {submitted ? (
        <p role="status" aria-live="polite" className="text-sm text-emerald-300">
          Thanks! We will get back to you shortly.
        </p>
      ) : null}
    </form>
  );
}

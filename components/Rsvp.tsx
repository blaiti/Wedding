"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { wedding } from "@/lib/wedding-config";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { MagneticButton } from "./ui/MagneticButton";

interface RsvpData {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: number;
  dietary: string;
  message: string;
}

type Errors = Partial<Record<keyof RsvpData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * submitRsvp — placeholder submission handler.
 *
 * TODO: Connect this to a real backend. Options:
 *   • A Next.js Route Handler at app/api/rsvp/route.ts that writes to a DB
 *     (Postgres/Supabase) or appends to a Google Sheet, then `fetch('/api/rsvp')`.
 *   • A form service (Formspree / Basin) — POST the payload to their endpoint.
 *   • An email via Resend from a server action.
 * For now this just simulates latency and resolves successfully.
 */
async function submitRsvp(data: RsvpData): Promise<void> {
  await new Promise((r) => setTimeout(r, 1100));
  console.log("RSVP submitted (placeholder):", data);
}

const initial: RsvpData = {
  name: "",
  email: "",
  attending: "",
  guests: 1,
  dietary: "",
  message: "",
};

export function Rsvp() {
  const [data, setData] = useState<RsvpData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const attendingYes = data.attending === "yes";

  function set<K extends keyof RsvpData>(key: K, value: RsvpData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.name.trim()) next.name = "Please tell us your name.";
    if (!data.email.trim()) next.email = "We need an email to reach you.";
    else if (!EMAIL_RE.test(data.email)) next.email = "That email doesn't look right.";
    if (!data.attending) next.attending = "Let us know if you can make it.";
    if (attendingYes && (data.guests < 1 || data.guests > wedding.rsvp.maxGuests)) {
      next.guests = `Choose between 1 and ${wedding.rsvp.maxGuests} guests.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await submitRsvp(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="rsvp" eyebrow="Be There" title="Will You Join Us?">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <p className="mb-10 text-center text-sm text-mist-dim">
            {wedding.rsvp.deadline}
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-10 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40 text-champagne glow-champagne">
                <CheckIcon />
              </div>
              <h3 className="font-display text-2xl font-light text-ink">
                Thank you, {data.name.split(" ")[0]}.
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
                {attendingYes
                  ? "Your RSVP is in — we can't wait to celebrate with you."
                  : "We'll miss you, but thank you for letting us know."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass space-y-6 rounded-3xl p-6 sm:p-9"
            >
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className={inputCls(!!errors.name)}
                  autoComplete="name"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls(!!errors.email)}
                  autoComplete="email"
                />
              </Field>

              <Field label="Will you attend?" error={errors.attending}>
                <div className="grid grid-cols-2 gap-3">
                  {(["yes", "no"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("attending", opt)}
                      className={`rounded-xl border px-4 py-3 font-display text-sm uppercase tracking-[0.15em] transition-colors ${
                        data.attending === opt
                          ? "border-champagne/70 bg-champagne/10 text-champagne"
                          : "border-line text-mist hover:border-champagne/40"
                      }`}
                    >
                      {opt === "yes" ? "Joyfully accept" : "Regretfully decline"}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Guest count + dietary only matter if attending */}
              <AnimatePresence initial={false}>
                {attendingYes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6 overflow-hidden"
                  >
                    <Field label="Number of guests (incl. you)" error={errors.guests}>
                      <input
                        type="number"
                        min={1}
                        max={wedding.rsvp.maxGuests}
                        value={data.guests}
                        onChange={(e) => set("guests", Number(e.target.value))}
                        className={inputCls(!!errors.guests)}
                      />
                    </Field>

                    <Field label="Dietary notes (optional)">
                      <input
                        type="text"
                        value={data.dietary}
                        onChange={(e) => set("dietary", e.target.value)}
                        placeholder="Allergies, preferences…"
                        className={inputCls(false)}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              <Field label="A note for us (optional)">
                <textarea
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={3}
                  placeholder="Share a wish, a song request, anything…"
                  className={`${inputCls(false)} resize-none`}
                />
              </Field>

              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex justify-center pt-2">
                <MagneticButton type="submit" variant="solid">
                  {status === "submitting" ? "Sending…" : "Send RSVP"}
                </MagneticButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ── Small building blocks ─────────────────────────────────────────────── */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-xs uppercase tracking-[0.2em] text-mist-dim">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-void/40 px-4 py-3 text-sm text-ink placeholder:text-mist-dim/70 outline-none transition-colors focus:border-champagne/60 ${
    hasError ? "border-red-400/60" : "border-line"
  }`;
}

function CheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

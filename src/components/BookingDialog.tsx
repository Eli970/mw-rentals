import { FormEvent, useEffect, useId, useRef, useState } from "react";
import type { InquiryDraft } from "../config";
import type { Car } from "../types";
import {
  buildInquiryMessage,
  mailtoUrl,
  whatsappUrl,
  type InquiryPayload,
} from "../lib";

export type BookingPrefill = {
  car?: Car;
  location: string;
  startDate: string;
  endDate: string;
};

type Props = {
  open: boolean;
  draft: InquiryDraft;
  prefill: BookingPrefill;
  onClose: () => void;
};

const EMPTY: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  location: "",
  startDate: "",
  endDate: "",
  vehicle: "",
  driverAge: "",
  message: "",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function BookingDialog({ open, draft, prefill, onClose }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState<InquiryPayload>(EMPTY);
  const [sent, setSent] = useState<InquiryPayload | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const car = prefill.car;
    setSent(null);
    setForm({
      ...EMPTY,
      location:
        (prefill.location !== "All" && prefill.location) || car?.location || "",
      startDate: prefill.startDate,
      endDate: prefill.endDate,
      vehicle: car?.name || "",
    });
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );

    const t = window.setTimeout(() => {
      const items = focusables();
      (items.find((el) => el.tagName === "INPUT") ?? items[0])?.focus();
    }, 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: InquiryPayload = {
      ...form,
      location: form.location || (draft.location === "All" ? "" : draft.location),
      vehicle: form.vehicle || draft.vehicle,
      startDate: form.startDate || draft.startDate,
      endDate: form.endDate || draft.endDate,
    };
    // TODO: Replace client-side WhatsApp / mailto with a Worker API route
    // that stores bookings (Sanity, D1, or email via Resend) and sends a
    // confirmation. Keep this form posting JSON matching InquiryPayload.
    window.open(
      whatsappUrl(buildInquiryMessage(payload, draft)),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(payload);
  };

  const reset = () => {
    setSent(null);
    setForm({
      ...EMPTY,
      location:
        (prefill.location !== "All" && prefill.location) ||
        prefill.car?.location ||
        "",
      startDate: prefill.startDate,
      endDate: prefill.endDate,
      vehicle: prefill.car?.name || "",
    });
  };

  const minAge = prefill.car?.minAge;

  return (
    <div className="dialog-root">
      <button
        type="button"
        className="dialog-backdrop"
        aria-label="Close booking form"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="dialog-head">
          <div>
            <p className="kicker">Book now</p>
            <h2 id={titleId} className="display">
              {prefill.car ? prefill.car.name : "Reserve a vehicle"}
            </h2>
            {prefill.car ? (
              <p className="dialog-sub">
                {prefill.car.category} · {prefill.car.location} · min. age{" "}
                {prefill.car.minAge}
              </p>
            ) : (
              <p className="dialog-sub">
                Share your details and a coordinator will confirm availability.
              </p>
            )}
          </div>
          <button type="button" className="dialog-close" onClick={onClose}>
            <span className="visually-hidden">Close</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2 2 L14 14 M14 2 L2 14"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="success" role="status">
            <h3>Booking request ready to send.</h3>
            <p>
              WhatsApp should have opened with a message for{" "}
              {sent.vehicle || "a flexible vehicle"} in{" "}
              {sent.location || "your chosen city"}. If the popup was blocked,
              use the buttons below.
            </p>
            <div className="form-actions">
              <a
                className="btn btn-gold"
                href={whatsappUrl(buildInquiryMessage(sent, draft))}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp
              </a>
              <a
                className="btn btn-navy"
                href={mailtoUrl(buildInquiryMessage(sent, draft), sent.name)}
              >
                Open email
              </a>
              <button className="btn btn-outline" type="button" onClick={reset}>
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <label className="field">
                <span>Full name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Pickup location</span>
                <input
                  required
                  name="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="London, Dubai, New York…"
                />
              </label>
              <label className="field">
                <span>Pickup date</span>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Return date</span>
                <input
                  type="date"
                  name="endDate"
                  required
                  min={form.startDate || undefined}
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Driver age</span>
                <input
                  required
                  type="number"
                  name="driverAge"
                  min={minAge ?? 18}
                  max={90}
                  inputMode="numeric"
                  placeholder={minAge ? `Minimum ${minAge}` : "Age at pickup"}
                  value={form.driverAge}
                  onChange={(e) => setForm({ ...form, driverAge: e.target.value })}
                />
              </label>
              <label className="field">
                <span>Vehicle</span>
                <input
                  name="vehicle"
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  placeholder="Any, or a model from the fleet"
                  readOnly={Boolean(prefill.car)}
                />
              </label>
              <label className="field span-2">
                <span>Notes</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Child seats, additional drivers, one-way, delivery address…"
                />
              </label>
              <button className="btn btn-navy btn-full span-2" type="submit">
                Send via WhatsApp
              </button>
              <p className="form-note span-2">
                Submitting opens a prefilled WhatsApp chat. No data is stored on
                this site yet.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

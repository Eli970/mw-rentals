import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { InquiryDraft } from "../config";
import { TIMES } from "../config";
import type { Car } from "../types";
import {
  buildInquiryMessage,
  formatPrice,
  mailtoUrl,
  whatsappUrl,
  type InquiryPayload,
} from "../lib";
import { useDialog } from "../useDialog";

export type BookingPrefill = {
  car?: Car;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
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
  startTime: "10:00",
  endDate: "",
  endTime: "10:00",
  vehicle: "",
  driverAge: "",
  message: "",
};

export function BookingDialog({ open, draft, prefill, onClose }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<InquiryPayload>(EMPTY);
  const [sent, setSent] = useState<InquiryPayload | null>(null);
  useDialog(open, onClose, dialogRef);

  useEffect(() => {
    if (!open) return;
    const car = prefill.car;
    setSent(null);
    setForm({
      ...EMPTY,
      location:
        (prefill.location !== "All" && prefill.location) || car?.location || "",
      startDate: prefill.startDate,
      startTime: prefill.startTime || "10:00",
      endDate: prefill.endDate,
      endTime: prefill.endTime || "10:00",
      vehicle: car?.name || "",
    });
  }, [open, prefill]);

  if (!open) return null;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: InquiryPayload = {
      ...form,
      location: form.location || (draft.location === "All" ? "" : draft.location),
      vehicle: form.vehicle || draft.vehicle,
      startDate: form.startDate || draft.startDate,
      startTime: form.startTime || draft.startTime,
      endDate: form.endDate || draft.endDate,
      endTime: form.endTime || draft.endTime,
    };
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
      startTime: prefill.startTime || "10:00",
      endDate: prefill.endDate,
      endTime: prefill.endTime || "10:00",
      vehicle: prefill.car?.name || "",
    });
  };

  const minAge = prefill.car?.minAge;

  return createPortal(
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
            <h2 id={titleId}>
              {prefill.car ? `Book ${prefill.car.name}` : "Book a car"}
            </h2>
            {prefill.car ? (
              <p className="dialog-sub">
                {prefill.car.location} · {prefill.car.seats} seats · min. age{" "}
                {prefill.car.minAge} · from {formatPrice(prefill.car.pricePerDay)}
                /day
              </p>
            ) : (
              <p className="dialog-sub">
                A coordinator confirms availability and the deposit.
              </p>
            )}
          </div>
          <button type="button" className="dialog-close" onClick={onClose}>
            <span className="visually-hidden">Close</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2 2 L14 14 M14 2 L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="success" role="status">
            <h3>Request ready to send</h3>
            <p>
              WhatsApp should have opened with a message for{" "}
              {sent.vehicle || "a flexible car"} in{" "}
              {sent.location || "your chosen city"}. If it was blocked, use the
              links below.
            </p>
            <div className="form-actions">
              <a
                className="btn btn-navy"
                href={whatsappUrl(buildInquiryMessage(sent, draft))}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp
              </a>
              <a
                className="btn btn-ghost"
                href={mailtoUrl(buildInquiryMessage(sent, draft), sent.name)}
              >
                Open email
              </a>
              <button className="btn btn-ghost" type="button" onClick={reset}>
                Send another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <label className="field span-2">
                <span>Full name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label className="field span-2">
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
                <span>Pickup time</span>
                <select
                  name="startTime"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                >
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                <span>Return time</span>
                <select
                  name="endTime"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                >
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                <span>Car</span>
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
                  placeholder="Child seats, extra drivers, one-way, delivery…"
                />
              </label>
              <button className="btn btn-navy btn-full span-2" type="submit">
                Send via WhatsApp
              </button>
              <p className="form-note span-2">
                Opens a prefilled WhatsApp chat. Nothing is stored on this site
                yet.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

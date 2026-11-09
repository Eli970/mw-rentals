import { FormEvent, useEffect, useState } from "react";
import { CONTACT, type InquiryDraft } from "../config";
import {
  buildInquiryMessage,
  mailtoUrl,
  whatsappUrl,
  type InquiryPayload,
} from "../lib";

type Props = {
  draft: InquiryDraft;
};

const EMPTY: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  location: "",
  startDate: "",
  endDate: "",
  vehicle: "",
  message: "",
};

export function Inquiry({ draft }: Props) {
  const [form, setForm] = useState<InquiryPayload>(EMPTY);
  const [sent, setSent] = useState<InquiryPayload | null>(null);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      location: draft.location === "All" ? current.location : draft.location,
      startDate: draft.startDate || current.startDate,
      endDate: draft.endDate || current.endDate,
      vehicle: draft.vehicle || current.vehicle,
    }));
  }, [draft]);

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
    // that stores inquiries (Sanity, D1, or email via Resend) and sends a
    // confirmation. Keep this form posting JSON matching InquiryPayload.
    const text = buildInquiryMessage(payload, draft);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setSent(payload);
  };

  const reset = () => {
    setSent(null);
    setForm({
      ...EMPTY,
      location: draft.location === "All" ? "" : draft.location,
      startDate: draft.startDate,
      endDate: draft.endDate,
      vehicle: draft.vehicle,
    });
  };

  return (
    <section className="section section-navy" id="inquire" aria-labelledby="inquire-title">
      <div className="wrap inquiry-split">
        <div>
          <p className="kicker">Inquire</p>
          <h2 id="inquire-title" className="display">
            Tell us the city, the dates, and the car.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            There is no booking engine on this page yet. Submit the form to
            open a prefilled WhatsApp message for a coordinator. You can also
            email us from the success screen.
          </p>

          <div className="inquiry-panel">
            {sent ? (
              <div className="success" role="status">
                <h3>Inquiry ready to send.</h3>
                <p>
                  WhatsApp should have opened with a message for{" "}
                  {sent.vehicle || "a flexible vehicle"} in{" "}
                  {sent.location || "your chosen city"}. If the popup was
                  blocked, use the buttons below.
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
                  <a className="btn btn-navy" href={mailtoUrl(buildInquiryMessage(sent, draft), sent.name)}>
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
                    <span>Phone / WhatsApp</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </label>
                  <label className="field">
                    <span>Pickup city</span>
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
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </label>
                  <label className="field">
                    <span>Return date</span>
                    <input
                      type="date"
                      name="endDate"
                      min={form.startDate || undefined}
                      value={form.endDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </label>
                  <label className="field span-2">
                    <span>Vehicle</span>
                    <input
                      name="vehicle"
                      value={form.vehicle}
                      onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                      placeholder="Any, or a model from the fleet"
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
                    Submitting opens a prefilled WhatsApp chat. No data is
                    stored on this site yet.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        <aside className="contact-aside" aria-label="Contact">
          <h3 className="display">Concierge desk</h3>
          <p className="lede">
            Prefer to skip the form? Write or call. We answer in English around
            the clock; other languages by arrangement.
          </p>
          <dl>
            <dt>WhatsApp / phone</dt>
            <dd>
              <a href={`tel:+${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
            <dt>Hours</dt>
            <dd>{CONTACT.hours}</dd>
            <dt>Cities</dt>
            <dd>
              London, Dubai, New York, Miami, Los Angeles, Paris, Singapore,
              Tokyo
            </dd>
          </dl>
        </aside>
      </div>
    </section>
  );
}

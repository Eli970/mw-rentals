import { CONTACT } from "./config";
import type { InquiryDraft } from "./config";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  startDate: string;
  endDate: string;
  vehicle: string;
  driverAge: string;
  message: string;
};

export function buildInquiryMessage(
  payload: InquiryPayload,
  draft: InquiryDraft,
): string {
  const lines = [
    `Hello MW Rentals, I would like to book a rental.`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `City: ${payload.location || draft.location || "—"}`,
    `Vehicle: ${payload.vehicle || draft.vehicle || "Flexible"}`,
    `Category: ${draft.category && draft.category !== "All" ? draft.category : "Flexible"}`,
    `Pickup: ${payload.startDate || draft.startDate || "—"}`,
    `Return: ${payload.endDate || draft.endDate || "—"}`,
    `Driver age: ${payload.driverAge || "—"}`,
  ];
  if (payload.message.trim()) {
    lines.push("", payload.message.trim());
  }
  return lines.join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${CONTACT.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(text: string, name: string): string {
  const subject = encodeURIComponent(`Rental booking from ${name || "website"}`);
  return `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
}

export function getPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

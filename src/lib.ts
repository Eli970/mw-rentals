import { CONTACT } from "./config";
import type { InquiryDraft } from "./config";
import type { Car } from "./types";

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

export function carSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function findCar(cars: Car[], slug: string): Car | undefined {
  return cars.find((car) => carSlug(car.name) === slug);
}

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  vehicle: string;
  driverAge: string;
  message: string;
};

export function buildInquiryMessage(
  payload: InquiryPayload,
  draft: InquiryDraft,
): string {
  const pickup = [payload.startDate || draft.startDate, payload.startTime || draft.startTime]
    .filter(Boolean)
    .join(" ");
  const ret = [payload.endDate || draft.endDate, payload.endTime || draft.endTime]
    .filter(Boolean)
    .join(" ");
  const lines = [
    `Hello MW Rentals, I would like to book a rental.`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `City: ${payload.location || draft.location || "—"}`,
    `Vehicle: ${payload.vehicle || draft.vehicle || "Flexible"}`,
    `Category: ${draft.category && draft.category !== "All" ? draft.category : "Flexible"}`,
    `Pickup: ${pickup || "—"}`,
    `Return: ${ret || "—"}`,
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

export const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

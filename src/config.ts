export const CONTACT = {
  brand: "MW Rentals",
  tagline: "Short & long-term hire",
  email: "hello@mwrentals.com",
  phoneDisplay: "+1 (212) 555-0148",
  phoneE164: "12125550148",
  whatsappE164: "12125550148",
  hours: "Desk open 24 hours",
} as const;

export const CITIES = [
  "London",
  "Dubai",
  "New York",
  "Miami",
  "Los Angeles",
  "Paris",
  "Singapore",
  "Tokyo",
] as const;

export const CATEGORIES = [
  "Economy",
  "Compact",
  "Sedan",
  "SUV",
  "Luxury",
  "Electric",
  "Sports",
] as const;

export const TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
] as const;

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export type InquiryDraft = {
  category: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  vehicle: string;
  transmission: string;
  seats: string;
  sort: SortKey;
};

export const EMPTY_INQUIRY: InquiryDraft = {
  category: "All",
  location: "All",
  startDate: "",
  startTime: "10:00",
  endDate: "",
  endTime: "10:00",
  vehicle: "",
  transmission: "All",
  seats: "All",
  sort: "featured",
};

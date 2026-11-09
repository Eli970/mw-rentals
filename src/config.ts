export const CONTACT = {
  brand: "MW Rentals",
  tagline: "Short & Long-Term • Worldwide",
  email: "hello@mwrentals.com",
  phoneDisplay: "+1 (212) 555-0148",
  phoneE164: "12125550148",
  whatsappE164: "12125550148",
  hours: "Concierge desk open 24/7",
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

export type InquiryDraft = {
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  vehicle: string;
};

export const EMPTY_INQUIRY: InquiryDraft = {
  category: "All",
  location: "All",
  startDate: "",
  endDate: "",
  vehicle: "",
};

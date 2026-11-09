export type Transmission = "Automatic" | "Manual";
export type Fuel = "Petrol" | "Diesel" | "Electric" | "Hybrid";

export type Car = {
  name: string;
  category: string;
  pricePerDay: number;
  image: string;
  minAge: number;
  location: string;
  seats: number;
  bags: number;
  transmission: Transmission;
  fuel: Fuel;
};

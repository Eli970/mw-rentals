import { useEffect, useState } from "react";
import carsData from "./data/cars.json";
import { EMPTY_INQUIRY, type InquiryDraft } from "./config";
import type { Car } from "./types";
import { getPath, scrollToId } from "./lib";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Fleet } from "./components/Fleet";
import { Requirements } from "./components/Requirements";
import { Desks } from "./components/Desks";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { CarDetail } from "./components/CarDetail";
import { BookingDialog, type BookingPrefill } from "./components/BookingDialog";

const cars = carsData as Car[];

const TITLES: Record<string, string> = {
  "/": "MW Rentals — Short & long-term car hire",
  "/privacy": "Privacy Policy — MW Rentals",
  "/terms": "Terms of Service — MW Rentals",
};

export default function App() {
  const [path, setPath] = useState(getPath);
  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_INQUIRY);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detail, setDetail] = useState<Car | null>(null);
  const [prefill, setPrefill] = useState<BookingPrefill>({
    location: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "10:00",
  });

  useEffect(() => {
    const onNav = () => setPath(getPath());
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES["/"];
  }, [path]);

  const searchFleet = () => {
    scrollToId("fleet");
  };

  const openBooking = (car?: Car) => {
    setDetail(null);
    setPrefill({
      car,
      location: car?.location || (draft.location === "All" ? "" : draft.location),
      startDate: draft.startDate,
      startTime: draft.startTime,
      endDate: draft.endDate,
      endTime: draft.endTime,
    });
    setBookingOpen(true);
  };

  const dialog = (
    <>
      <CarDetail
        car={detail}
        onClose={() => setDetail(null)}
        onBook={openBooking}
      />
      <BookingDialog
        open={bookingOpen}
        draft={draft}
        prefill={prefill}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );

  if (path === "/privacy") {
    return (
      <>
        <LegalPage kind="privacy" onBookNow={() => openBooking()} />
        {dialog}
      </>
    );
  }

  if (path === "/terms") {
    return (
      <>
        <LegalPage kind="terms" onBookNow={() => openBooking()} />
        {dialog}
      </>
    );
  }

  const from = Math.min(...cars.map((c) => c.pricePerDay));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top">
        <Header onBookNow={() => openBooking()} />
        <main id="main">
          <Hero
            draft={draft}
            onChange={setDraft}
            onSearch={searchFleet}
            carCount={cars.length}
            cityCount={new Set(cars.map((c) => c.location)).size}
            from={from}
          />
          <Fleet
            cars={cars}
            draft={draft}
            onChange={setDraft}
            onOpen={setDetail}
            onBook={openBooking}
          />
          <Requirements />
          <Desks cars={cars} />
        </main>
        <Footer onBookNow={() => openBooking()} />
      </div>
      {dialog}
    </>
  );
}

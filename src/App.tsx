import { useEffect, useMemo, useState } from "react";
import carsData from "./data/cars.json";
import { CITIES, EMPTY_INQUIRY, type InquiryDraft } from "./config";
import type { Car } from "./types";
import { getPath, scrollToId } from "./lib";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Fleet } from "./components/Fleet";
import { WhyUs } from "./components/WhyUs";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Inquiry } from "./components/Inquiry";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { BookingDialog, type BookingPrefill } from "./components/BookingDialog";

const cars = carsData as Car[];

const TITLES: Record<string, string> = {
  "/": "MW Rentals — Short & Long-Term Car Hire, Worldwide",
  "/privacy": "Privacy Policy — MW Rentals",
  "/terms": "Terms of Service — MW Rentals",
};

export default function App() {
  const [path, setPath] = useState(getPath);
  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_INQUIRY);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({
    location: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const onNav = () => setPath(getPath());
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES["/"];
  }, [path]);

  const cityLine = useMemo(() => CITIES.join("  ·  "), []);

  const searchFleet = () => {
    scrollToId("fleet");
  };

  const openBooking = (car?: Car) => {
    setPrefill({
      car,
      location: car?.location || (draft.location === "All" ? "" : draft.location),
      startDate: draft.startDate,
      endDate: draft.endDate,
    });
    setBookingOpen(true);
  };

  const dialog = (
    <BookingDialog
      open={bookingOpen}
      draft={draft}
      prefill={prefill}
      onClose={() => setBookingOpen(false)}
    />
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

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top">
        <Header onBookNow={() => openBooking()} />
        <main id="main">
          <Hero draft={draft} onChange={setDraft} onSearch={searchFleet} />
          <div className="cities-bar">
            <p>
              Desks in <strong>{cityLine}</strong>
            </p>
          </div>
          <Fleet cars={cars} draft={draft} onChange={setDraft} onBook={openBooking} />
          <WhyUs />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <Inquiry onBookNow={() => openBooking()} />
        </main>
        <Footer onBookNow={() => openBooking()} />
      </div>
      {dialog}
    </>
  );
}

import { useMemo, useState } from "react";
import carsData from "./data/cars.json";
import { CITIES, EMPTY_INQUIRY, type InquiryDraft } from "./config";
import type { Car } from "./types";
import { scrollToId } from "./lib";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Fleet } from "./components/Fleet";
import { WhyUs } from "./components/WhyUs";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Inquiry } from "./components/Inquiry";
import { Footer } from "./components/Footer";

const cars = carsData as Car[];

export default function App() {
  const [draft, setDraft] = useState<InquiryDraft>(EMPTY_INQUIRY);

  const cityLine = useMemo(() => CITIES.join("  ·  "), []);

  const searchFleet = () => {
    scrollToId("fleet");
  };

  const inquire = (vehicle: string) => {
    setDraft((current) => ({ ...current, vehicle }));
    scrollToId("inquire");
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top">
        <Header />
        <main id="main">
          <Hero draft={draft} onChange={setDraft} onSearch={searchFleet} />
          <div className="cities-bar">
            <p>
              Desks in <strong>{cityLine}</strong>
            </p>
          </div>
          <Fleet cars={cars} draft={draft} onChange={setDraft} onInquire={inquire} />
          <WhyUs />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <Inquiry draft={draft} />
        </main>
        <Footer />
      </div>
    </>
  );
}

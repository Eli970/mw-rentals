import { CONTACT } from "../config";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Kind = "privacy" | "terms";

type Props = {
  kind: Kind;
  onBookNow: () => void;
};

const PRIVACY = [
  {
    title: "1. Who we are",
    body: `This Privacy Policy describes how ${CONTACT.brand} (“MW Rentals”, “we”, “us”) collects and uses information when you visit mwrentals.com, submit a booking request, or otherwise contact our desk. This page is a template for client review and is not legal advice.`,
  },
  {
    title: "2. Information we collect",
    body: "When you use the Book Now form we collect the details you provide: name, email address, telephone number, pickup location, pickup and return dates and times, driver age, vehicle requested, and any notes. If you contact us by WhatsApp, telephone, or email we also receive whatever you send on those channels. Server logs may record IP address, browser type, and pages visited.",
  },
  {
    title: "3. How we use it",
    body: "We use this information to respond to booking requests, prepare quotes, arrange pickup and delivery, verify driver eligibility (including minimum age), manage deposits and insurance, prevent fraud, and improve the website. We do not sell personal information.",
  },
  {
    title: "4. Legal bases",
    body: "Where data-protection law applies, we process information to take steps at your request before a contract, to perform a hire agreement, to comply with legal obligations (for example licensing and tax records), and for our legitimate interests in operating a car-rental business and keeping the fleet and customers safe.",
  },
  {
    title: "5. Sharing",
    body: "We share information with local fleet partners and delivery drivers in the city you booked, insurers, payment processors, roadside-assistance providers, and professional advisers, only as needed to fulfil a hire. We may disclose information if required by law or to protect the rights, property, or safety of MW Rentals, our customers, or the public.",
  },
  {
    title: "6. International transfers",
    body: "MW Rentals operates desks in multiple countries. Your information may be processed in the United States, the United Kingdom, the European Union, the United Arab Emirates, Singapore, Japan, or other locations where we or our partners work. We take reasonable steps to protect it in transit and at rest.",
  },
  {
    title: "7. Retention",
    body: "Enquiry records that do not become a hire are kept for up to 24 months. Hire contracts, identity checks, and payment records are retained for the period required by tax, insurance, and motor-licensing rules in the relevant city, then deleted or anonymised.",
  },
  {
    title: "8. Your rights",
    body: "Depending on where you live you may have the right to access, correct, delete, or export your information, to object to or restrict certain processing, and to lodge a complaint with a supervisory authority. Contact us using the details below. We may need to verify your identity before acting on a request.",
  },
  {
    title: "9. Cookies and analytics",
    body: "This marketing site is static and does not currently set advertising cookies. If we later add analytics or a booking engine, we will update this policy and, where required, request consent.",
  },
  {
    title: "10. Children",
    body: "The site is not directed at children. Drivers must meet the minimum age printed on each vehicle. We do not knowingly collect information from anyone under 16.",
  },
  {
    title: "11. Changes",
    body: "We may update this policy from time to time. The “Last updated” date at the top of the page will change when we do. Material changes will be highlighted on this page.",
  },
  {
    title: "12. Contact",
    body: `Questions about privacy: ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
  },
];

const TERMS = [
  {
    title: "1. About these terms",
    body: `These Terms of Service govern use of the ${CONTACT.brand} website and booking requests submitted through it. They are a template for client review, not a substitute for a signed hire agreement. The hire itself is governed by the written quote and rental agreement you receive from a coordinator.`,
  },
  {
    title: "2. Who may book",
    body: "You must be at least 18 to submit a request. To collect a vehicle you must hold a full, valid driving licence for at least twelve months and meet the minimum driver age for that category (typically 21–25). Additional drivers must meet the same standard. We may refuse a booking where licensing, insurance, or sanctions rules do not allow us to hire to you.",
  },
  {
    title: "3. Quotes and rates",
    body: "Daily rates on the website are indicative and shown in US dollars for comparison. The confirmed rate, currency, taxes, excess, and deposit appear on your written quote. Long-term hires (28 days or more) may be billed monthly in advance. Fuel, tolls, parking, congestion charges, and traffic fines remain yours.",
  },
  {
    title: "4. Booking requests",
    body: "Submitting the Book Now form, a WhatsApp message, or an email is a request, not a confirmed reservation. A coordinator will confirm availability, inclusions, and pickup instructions. The vehicle is held only when you accept the quote and pay any reservation fee stated on it.",
  },
  {
    title: "5. Deposits, insurance, and condition",
    body: "A refundable security hold is taken on a major credit card at pickup. Standard cover and any excess are described on the quote. You must inspect the car, note existing damage, and return it in a similar condition, with the agreed fuel level, at the agreed place and time.",
  },
  {
    title: "6. Use of the vehicle",
    body: "The car may only be driven by named, eligible drivers, on public roads, and in the territory authorised on the agreement. Off-road use, racing, towing (unless specified), sub-hire, and smoking in the cabin are prohibited. Cross-border travel needs prior written approval and may require extra insurance.",
  },
  {
    title: "7. Cancellations and no-shows",
    body: "Cancellations more than 48 hours before pickup release the reservation fee in full. Inside 48 hours we retain it unless we can re-let the car. No-shows are charged one day’s hire. MW Rentals may cancel if the vehicle becomes unroadworthy; we will offer an equivalent car or a refund of sums paid for unused days.",
  },
  {
    title: "8. Delivery and collection",
    body: "Airport, hotel, and residence delivery are available in listed cities, subject to timing and any after-hours fee shown on the quote. You must produce the licence and card used to book. We may refuse handover if documents do not match.",
  },
  {
    title: "9. Liability",
    body: "Nothing in these terms excludes liability for death or personal injury caused by negligence, or for fraud. To the fullest extent permitted by law, MW Rentals is not liable for indirect or consequential loss, or for delays caused by traffic, weather, or third-party suppliers. Our total liability for a booking request that does not become a hire is limited to sums you have paid us for that request.",
  },
  {
    title: "10. Website",
    body: "The site is provided “as is”. Fleet photographs are illustrative of category and model; the actual car may differ in colour and specification. We may change listings without notice. You must not misuse the site, scrape it, or attempt to interfere with its operation.",
  },
  {
    title: "11. Governing law",
    body: "These website terms are governed by the laws of England and Wales, without prejudice to any mandatory consumer protections where you live. Hire agreements may specify the law of the city of pickup.",
  },
  {
    title: "12. Contact",
    body: `Desk: ${CONTACT.email}, ${CONTACT.phoneDisplay}. ${CONTACT.hours}.`,
  },
];

export function LegalPage({ kind, onBookNow }: Props) {
  const title = kind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const sections = kind === "privacy" ? PRIVACY : TERMS;
  const updated = "9 November 2026";

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top">
        <Header homeHref="/" onBookNow={onBookNow} />
        <main id="main" className="legal-page">
          <header className="legal-hero">
            <div className="wrap">
              <h1>{title}</h1>
              <p className="lede">
                Last updated {updated}. Template for a short- and long-term
                car-hire business. Have counsel review it before you rely on it.
              </p>
            </div>
          </header>
          <div className="wrap legal-body">
            <p className="legal-banner" role="note">
              Template for client review — not legal advice. Replace contact
              details, governing law, and insurance wording to match the live
              operation.
            </p>
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <p>
              <a href="/">Back to MW Rentals</a>
            </p>
          </div>
        </main>
        <Footer onBookNow={onBookNow} />
      </div>
    </>
  );
}

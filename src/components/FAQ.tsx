import { useState } from "react";

const FAQS = [
  {
    q: "What is included in the daily rate?",
    a: "Third-party and collision cover to the limits on your quote, roadside assistance, airport or city taxes we can foresee, and a second named driver on most categories. Fuel, tolls, parking, and congestion charges remain yours. Cross-border insurance is quoted separately.",
  },
  {
    q: "What is the minimum driver age?",
    a: "It is printed on each vehicle card — typically 21 for economy and compact, 23 for sedan and electric, and 25 for luxury, SUV, and convertible. A full licence held for at least twelve months is required. Additional drivers must meet the same age.",
  },
  {
    q: "Do you discount long-term hire?",
    a: "Yes. Stays of 28 days or more are quoted at a reduced daily rate, billed monthly in advance. We inspect the car at the midpoint of assignments longer than three months and rotate rubber if the mileage warrants it.",
  },
  {
    q: "Can I take a car across a border or emirate?",
    a: "Often, with notice. European desks can usually arrange Schengen travel. UAE hires can travel between emirates; Oman requires a letter. The United States allows state-to-state travel as standard. Always ask before you book — some luxury cars stay in-city.",
  },
  {
    q: "How do deposits and cancellations work?",
    a: "A refundable security hold is taken on a major credit card at pickup. Cancellations more than 48 hours before pickup release the reservation fee in full. Inside 48 hours we retain it unless we can re-let the car. No-shows are charged one day.",
  },
  {
    q: "Do you deliver to airports and hotels?",
    a: "Yes, at every listed city. Meet-and-greet is available at the main international terminals. Hotel and residence delivery is timed to your arrival. After-hours fees, if any, appear on the quote before you confirm.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Questions</p>
          <h2 id="faq-title" className="display">
            Straight answers before you book.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            If your trip involves a one-way, a film permit, or a driver under
            25 in a luxury car, write it on the form — the exceptions are where
            we earn our keep.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-btn-${index}`;
            return (
              <div className="faq-item" key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true">{isOpen ? "–" : "+"}</span>
                  </button>
                </h3>
                {isOpen ? (
                  <p className="answer" id={panelId} role="region" aria-labelledby={buttonId}>
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

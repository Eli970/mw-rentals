const RULES = [
  {
    title: "Documents",
    body: "Full driving licence held for at least 12 months, in the name of the driver collecting. Passport or national ID at some desks. Additional drivers need the same papers.",
  },
  {
    title: "Deposit",
    body: "A refundable hold on a major credit card at pickup. The amount is on the quote. Debit cards are not accepted for the hold.",
  },
  {
    title: "Age",
    body: "Printed on each car. Typically 21 for economy and compact, 23 for sedan and electric, 25 for SUV, luxury, and sports.",
  },
  {
    title: "Insurance",
    body: "Third-party and collision cover sit in the daily rate, with an excess on the quote. Fuel, tolls, parking, and fines stay with the hirer.",
  },
];

const NOTES = [
  {
    q: "What is in the daily rate?",
    a: "Cover to the limits on your quote, roadside assistance, foreseeable airport or city taxes, and a second named driver on most categories. Cross-border insurance is quoted separately.",
  },
  {
    q: "Long-term hire",
    a: "28 days or more is quoted at a reduced daily rate, billed monthly in advance. We inspect the car at the midpoint of assignments longer than three months.",
  },
  {
    q: "Cancellation",
    a: "More than 48 hours before pickup: reservation fee returned. Inside 48 hours we keep it unless the car is re-let. No-show is one day’s hire.",
  },
  {
    q: "Delivery",
    a: "Airport, hotel, and residence delivery in every listed city. After-hours fees, if any, appear on the quote before you confirm.",
  },
];

export function Requirements() {
  return (
    <section className="section" id="requirements" aria-labelledby="req-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="req-title">Before you collect</h2>
          <p className="lede">
            These rules apply at every desk. The written quote is the contract
            for a specific hire.
          </p>
        </div>
        <div className="req-grid">
          {RULES.map((rule) => (
            <article key={rule.title} className="req-block">
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
            </article>
          ))}
        </div>
        <div className="faq-list">
          {NOTES.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

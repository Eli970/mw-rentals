const POINTS = [
  {
    title: "Worldwide desks",
    body: "Coordinators in every city we list, not a call-center maze. You keep the same name from first inquiry to return.",
  },
  {
    title: "Flexible tenure",
    body: "A Friday-to-Monday city car or a six-month relocation. Short and long-term sit on the same rate card, quoted in writing.",
  },
  {
    title: "Known condition",
    body: "Mileage, last service, and recent photographs before you confirm. No surprise paintwork at the pickup bay.",
  },
  {
    title: "Delivery & collection",
    body: "Airport, hotel, or residence, scheduled to the hour. After-hours handovers are available at most desks.",
  },
  {
    title: "Inclusive daily rates",
    body: "Insurance, roadside assistance, and a second driver on most categories. Taxes and deposits are itemised, never hidden.",
  },
  {
    title: "Human concierge",
    body: "WhatsApp or email, answered by people who have driven the cars. We would rather decline a request than over-promise.",
  },
];

export function WhyUs() {
  return (
    <section className="section section-navy" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Why MW Rentals</p>
          <h2 id="why-title" className="display">
            Hire that behaves like a private garage.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            MW Rentals was built for travellers and teams who need a reliable
            car in a city they do not live in — without the theatre of a luxury
            brand or the friction of a high-street counter.
          </p>
        </div>
        <div className="why-grid">
          {POINTS.map((point, index) => (
            <article className="why-card" key={point.title}>
              <div className="why-num">{String(index + 1).padStart(2, "0")}</div>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Select",
    body: "Filter the fleet by city and category, or tell us the brief. If we do not list it, we will say so quickly.",
  },
  {
    title: "Inquire",
    body: "Share dates and driver details. A coordinator confirms availability, inclusions, and the deposit within a few hours.",
  },
  {
    title: "Confirm",
    body: "You receive a written quote, pickup instructions, and a digital wallet card. Pay the reservation to hold the car.",
  },
  {
    title: "Drive",
    body: "Collect at the desk or meet your delivery driver. Return the same way. Long-term hires include a mid-term check-in.",
  },
];

export function HowItWorks() {
  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">How it works</p>
          <h2 id="how-title" className="display">
            Four steps. No counter queues.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            Most first-time clients go from inquiry to a held vehicle the same
            business day. Peak holiday weeks in Dubai and Miami need a little
            more notice.
          </p>
        </div>
        <div className="steps">
          {STEPS.map((step, index) => (
            <article className="step" key={step.title}>
              <div className="step-index" aria-hidden="true">
                {index + 1}
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

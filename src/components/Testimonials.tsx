const QUOTES = [
  {
    quote:
      "We needed a quiet executive car in Singapore for three months. MW held the same vehicle the whole assignment and dealt with parking permits we did not know existed.",
    name: "Helena Voss",
    detail: "Management consultant · Singapore",
  },
  {
    quote:
      "Family of five, two weeks in Dubai, airport delivery at 1 a.m. The SUV was clean, the child seats were already fitted, and the coordinator answered at midnight.",
    name: "James Okonkwo",
    detail: "Family holiday · Dubai",
  },
  {
    quote:
      "A production week in Los Angeles with a van and a runaround. Both cars arrived with full tanks and a spare contact who actually picked up.",
    name: "Priya Raman",
    detail: "Film production · Los Angeles",
  },
];

export function Testimonials() {
  return (
    <section className="section" id="stories" aria-labelledby="stories-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Client notes</p>
          <h2 id="stories-title" className="display">
            Quiet competence, repeated.
          </h2>
          <hr className="gold-rule" />
          <p className="lede">
            A short sample of recent assignments. Names used with permission;
            companies omitted where the work was confidential.
          </p>
        </div>
        <div className="quotes">
          {QUOTES.map((item) => (
            <figure className="quote" key={item.name}>
              <blockquote>“{item.quote}”</blockquote>
              <footer>
                <cite>{item.name}</cite>
                <div>{item.detail}</div>
              </footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

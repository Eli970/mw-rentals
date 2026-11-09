import { CITIES, CONTACT } from "../config";
import type { Car } from "../types";

type Props = {
  cars: Car[];
};

export function Desks({ cars }: Props) {
  return (
    <section className="section section-navy" id="desks" aria-labelledby="desks-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="desks-title">Desks</h2>
          <p className="lede">
            Eight cities. Same rate card. Call or write if the car you need is
            not listed — we will say so the same day.
          </p>
        </div>
        <ul className="desk-list">
          {CITIES.map((city) => {
            const n = cars.filter((c) => c.location === city).length;
            return (
              <li key={city}>
                <span className="desk-city">{city}</span>
                <span className="desk-count">
                  {n} {n === 1 ? "car" : "cars"} on the list
                </span>
              </li>
            );
          })}
        </ul>
        <p className="desk-contact">
          {CONTACT.phoneDisplay}
          {" · "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          {" · "}
          {CONTACT.hours}
        </p>
      </div>
    </section>
  );
}

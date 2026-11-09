import type { Car } from "../types";
import { formatPrice } from "../lib";

type Props = {
  car: Car;
  onOpen: (car: Car) => void;
  onBook: (car: Car) => void;
};

export function CarCard({ car, onOpen, onBook }: Props) {
  return (
    <article className="car-card">
      <button
        type="button"
        className="car-media"
        onClick={() => onOpen(car)}
        aria-label={`View ${car.name}`}
      >
        <img src={car.image} alt="" />
        <span className="badge">{car.category}</span>
      </button>
      <div className="car-body">
        <div className="car-title-row">
          <h3>
            <button type="button" className="car-name" onClick={() => onOpen(car)}>
              {car.name}
            </button>
          </h3>
          <p className="price">
            <span className="price-from">from</span> {formatPrice(car.pricePerDay)}
            <span className="price-unit">/day</span>
          </p>
        </div>
        <ul className="car-specs">
          <li>{car.seats} seats</li>
          <li>
            {car.bags} {car.bags === 1 ? "bag" : "bags"}
          </li>
          <li>{car.transmission}</li>
          <li>{car.fuel}</li>
        </ul>
        <p className="car-meta-line">
          {car.location} · Min. age {car.minAge}
        </p>
        <div className="car-actions">
          <button className="btn btn-ghost" type="button" onClick={() => onOpen(car)}>
            Details
          </button>
          <button className="btn btn-navy" type="button" onClick={() => onBook(car)}>
            Book now
          </button>
        </div>
      </div>
    </article>
  );
}

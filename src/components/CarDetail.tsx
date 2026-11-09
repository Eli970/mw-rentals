import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { Car } from "../types";
import { formatPrice } from "../lib";
import { useDialog } from "../useDialog";

type Props = {
  car: Car | null;
  onClose: () => void;
  onBook: (car: Car) => void;
};

export function CarDetail({ car, onClose, onBook }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(Boolean(car), onClose, dialogRef);

  if (!car) return null;

  const specs = [
    ["Category", car.category],
    ["Desk", car.location],
    ["Seats", String(car.seats)],
    ["Bags", String(car.bags)],
    ["Transmission", car.transmission],
    ["Fuel", car.fuel],
    ["Minimum age", String(car.minAge)],
    ["Daily rate", `from ${formatPrice(car.pricePerDay)}`],
  ];

  return createPortal(
    <div className="dialog-root">
      <button
        type="button"
        className="dialog-backdrop"
        aria-label="Close car details"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="drawer-head">
          <div>
            <p className="drawer-cat">{car.category}</p>
            <h2 id={titleId}>{car.name}</h2>
          </div>
          <button type="button" className="dialog-close" onClick={onClose}>
            <span className="visually-hidden">Close</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M2 2 L14 14 M14 2 L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <div className="drawer-gallery">
          <img src={car.image} alt={`${car.name}, front three-quarter view`} />
        </div>

        <p className="drawer-price">
          <span className="price-from">from</span> {formatPrice(car.pricePerDay)}
          <span className="price-unit"> / day</span>
        </p>

        <dl className="spec-table">
          {specs.map(([label, value]) => (
            <div key={label} className="spec-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <p className="drawer-note">
          Licence held 12 months. Credit card in the driver’s name at pickup.
        </p>

        <div className="drawer-actions">
          <button
            className="btn btn-navy btn-full"
            type="button"
            onClick={() => onBook(car)}
          >
            Book this car
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

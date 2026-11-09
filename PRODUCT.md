# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Travellers and teams who need a car in a city they do not live in — weekend city stays through multi-month assignments. They compare daily rates, check age and insurance rules, then send a booking request.

## Product Purpose

MW Rentals lists a real fleet with indicative daily rates across eight desks and takes booking requests (WhatsApp / email). Success is a complete request with city, dates, vehicle, and driver age — not a brochure conversion.

## Positioning

Named desks in eight cities, short and long-term on the same rate card, cars shown as studio cutouts with specs (seats, bags, transmission, fuel, min age). There is no live availability engine yet; Book Now prefills a coordinator message.

## Capabilities

- Filter and sort the fleet (category, location, price, seats, transmission)
- Open a car detail view with photo and specs
- Book Now dialog with prefill (car, location, dates/times)
- Privacy and terms pages
- Static SPA on Cloudflare Workers

## Constraints

- Keep the MW roundel logo, `cars.json` shape (extended with seats/bags/transmission/fuel), white-background car photos, Book Now dialog, `/privacy` `/terms`, Workers static assets + SPA fallback
- Contact: hello@mwrentals.com, +1 (212) 555-0148 (placeholder desk)
- Rates in USD, indicative until quoted
- Accessible, fully responsive; mobile booking must be excellent

## Brand commitments

- Navy / near-black + white; gold only as a precise accent (from the roundel)
- Copy: short, specific, business-like; no hype; no invented testimonials
- Inferred from owner brief (unattended session; no init interview)

## Voice

Plain, operational English. Name the city, the car, the rule. Buttons are verbs with objects (Search fleet, Book this car).

## Assets

- `/logo.jpg` — circular MW Rentals roundel (navy, gold, globe)
- `/cars/*.webp` — 18 studio-style white cutouts, front 3/4 left
- `@fontsource-variable` self-hosted faces

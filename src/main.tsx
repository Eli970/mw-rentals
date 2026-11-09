import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/figtree/wght.css";
import "@fontsource-variable/figtree/wght-italic.css";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element missing");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

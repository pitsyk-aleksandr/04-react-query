import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Імпортуємо основний компонент App
import App from "./components/App/App";
// Нормалізація стилів (додатково треба - npm install modern-normalize)
import "modern-normalize";
// Глобальні стилі (додатково)
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

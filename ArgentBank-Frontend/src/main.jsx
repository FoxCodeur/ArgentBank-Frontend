import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Composant qui permet la gestion du routage
import { BrowserRouter } from "react-router-dom";
import "./sass/index.scss";
import App from "./components/App/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

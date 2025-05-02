import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./sass/index.scss";
import App from "./components/App/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Comme pour le Context dans le projet précédent,
     on englobe l'application <App /> dans main.jsx avec un Provider */}
    <Provider store={store}>
      {/* ---------loading c'est un peu comme un loader, écran
       d'attente*/}
      {/* -----------------------Le persistor est l'instance qui 
       connecte Redux à sessionStorage. Il sert à gérer la persistance
       du state Redux. persistor est une propriété de redux-persist  */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

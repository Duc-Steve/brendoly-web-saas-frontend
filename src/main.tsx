import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/global.css";

/**
 * Point d'entrée principal de l'application React
 * Configure le store Redux et rend l'application dans le DOM
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Provider Redux pour la gestion d'état globale */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
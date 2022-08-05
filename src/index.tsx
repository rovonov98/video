import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import store from "@redux";
import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

reportWebVitals();

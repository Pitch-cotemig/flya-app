import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { theme } from "./lib/theme";
import { store } from "./store";
import "./App.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {" "}
          {}
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

import React from "react";
import { render } from "react-dom";
import { ga4react } from "./configuration/ga-4-react";
import { App } from "./containers/App";

(async () => {
  await ga4react.initialize();
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
})();

// reportWebVitals();

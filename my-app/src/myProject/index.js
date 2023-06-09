import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./App";

export default function () {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  );
}

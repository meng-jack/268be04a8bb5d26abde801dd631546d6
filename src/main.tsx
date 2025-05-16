import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const rootDiv = document.getElementById("root");
if (rootDiv) {
    const root = createRoot(rootDiv);
    root.render(<App />);
}

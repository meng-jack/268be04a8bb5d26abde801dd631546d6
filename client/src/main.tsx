import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '@mantine/core/styles.css';
import { Logging } from './shared/logger.ts';
const rootDiv = document.getElementById("root");
import "./styles/index.css";
if (rootDiv) {
    const root = createRoot(rootDiv);
    root.render(<App />);
    Logging.warn("Started the application!");
}

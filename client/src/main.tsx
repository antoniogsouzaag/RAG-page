import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Log versions to help detect mismatch problems in production
try {
	// eslint-disable-next-line no-console
	console.info("React version:", (React as any).version, "react-dom version:", (ReactDOM as any).version);
} catch (e) {
	// ignore
}

createRoot(document.getElementById("root")!).render(<App />);

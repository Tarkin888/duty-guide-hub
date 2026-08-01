import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installPrintMode } from "./lib/printMode";

installPrintMode();

createRoot(document.getElementById("root")!).render(<App />);

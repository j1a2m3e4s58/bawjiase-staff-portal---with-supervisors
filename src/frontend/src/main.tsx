import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StartupSplash } from "./components/StartupSplash";
import { withBase } from "./lib/app-base";
import "./index.css";

const APP_READY_EVENT = "bcb:app-ready";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StartupSplash>
      <App />
    </StartupSplash>
  </QueryClientProvider>,
);

window.requestAnimationFrame(() => {
  window.requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent(APP_READY_EVENT));
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(withBase("sw.js")).catch(() => {
      // Ignore registration failure in local/dev contexts.
    });
  });
}

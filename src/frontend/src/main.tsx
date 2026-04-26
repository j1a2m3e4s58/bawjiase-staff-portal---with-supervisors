import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
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

  interface Window {
    __BCB_APP_READY__?: boolean;
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

function AppReadySignal() {
  useEffect(() => {
    window.__BCB_APP_READY__ = true;
    window.dispatchEvent(new CustomEvent(APP_READY_EVENT));
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppReadySignal />
    <StartupSplash>
      <App />
    </StartupSplash>
  </QueryClientProvider>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(withBase("sw.js")).catch(() => {
      // Ignore registration failure in local/dev contexts.
    });
  });
}

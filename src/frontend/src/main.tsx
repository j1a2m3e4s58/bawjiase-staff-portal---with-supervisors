import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
<<<<<<< HEAD
import { StartupSplash } from "./components/StartupSplash";
=======
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58
import "./index.css";

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
<<<<<<< HEAD
    <StartupSplash>
      <App />
    </StartupSplash>
  </QueryClientProvider>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ignore registration failure in local/dev contexts.
    });
  });
}
=======
    <App />
  </QueryClientProvider>,
);
>>>>>>> 6f4511c08c8765a8e39dafb1e43a08a3658dea58

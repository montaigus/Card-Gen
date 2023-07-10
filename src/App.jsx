import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import NewCard from "./NewCard";
import AllCards from "./AllCards";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="appContainer">
        <NewCard />
        <AllCards />
      </div>
    </QueryClientProvider>
  );
};

const container = document.getElementById("page");
const root = createRoot(container);
root.render(<App />);

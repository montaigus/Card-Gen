import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import TypedCardsLayout from "./TypedCardsLayout";

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
        <TypedCardsLayout type="monstre" />
        <TypedCardsLayout type="sort" />
      </div>
    </QueryClientProvider>
  );
};

const container = document.getElementById("page");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

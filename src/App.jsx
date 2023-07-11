import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Card from "./Card";
import AllCards from "./AllCards";
import { Monstre } from "./cardTypes";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });

  const newMonstre = new Monstre("Nouveau Monstre", 0, 0, 0, 0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="appContainer">
        <Card key={newMonstre.id} cardItem={newMonstre} isExisting={false} />
        <AllCards />
      </div>
    </QueryClientProvider>
  );
};

const container = document.getElementById("page");
const root = createRoot(container);
root.render(<App />);

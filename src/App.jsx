import { createRoot } from "react-dom/client";

import ExistingCard from "./ExistingCard";
import NewCard from "./NewCard";
// TODO use data from the server
import allCards from "../Cards.json";
import CardLayout from "./CardLayout";

const App = (props) => {
  return (
    <div className="appContainer">
      <NewCard />

      <CardLayout title="Voir les cartes existantes" class="existingCards">
        {props.allCards.map((cardItem) => (
          <ExistingCard key={cardItem.id} cardItem={cardItem} />
        ))}
      </CardLayout>
    </div>
  );
};

const container = document.getElementById("page");
const root = createRoot(container);
root.render(<App allCards={allCards} />);

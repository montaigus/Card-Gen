import { useQuery } from "@tanstack/react-query";
import ExistingCard from "./ExistingCard";
// TODO use data from the server
//import allCards from "./Cards.json";
import CardLayout from "./CardLayout";
import fetchCards from "./fetchCards";

const AllCards = () => {
  const result = useQuery(["cards", 0], fetchCards);

  const cards = result.data;

  return (
    <CardLayout title="Voir les cartes existantes" class="existingCards">
      {/* cards est undefined, pourquoi ? */}
      {!result.isLoading &&
        cards.map((cardItem) => (
          <ExistingCard key={cardItem.id} cardItem={cardItem} />
        ))}
    </CardLayout>
  );
};

export default AllCards;

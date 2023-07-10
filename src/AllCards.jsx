import { useQuery } from "@tanstack/react-query";
import ExistingCard from "./ExistingCard";
import CardLayout from "./CardLayout";
import fetchCards from "./fetchCards";
import { useState } from "react";

const AllCards = () => {
  const result = useQuery(["cards", 0], fetchCards);

  const [cards, setCards] = useState([]);

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

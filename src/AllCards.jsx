import { useQuery } from "@tanstack/react-query";
import ExistingCard from "./ExistingCard";
import CardLayout from "./CardLayout";
import fetchCards from "./fetchCards";
import { useState } from "react";

const AllCards = () => {
  //aller chercher les données sur le server
  const result = useQuery(["cards", 0], fetchCards);

  //tentative pour mettre toutes les cartes dans un state pour le rafraichir dès qu'il y a un
  //! card est undefined lors de l'instanciation du composant
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

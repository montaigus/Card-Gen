import { useQuery } from "@tanstack/react-query";
import ExistingCard from "./ExistingCard";
import CardLayout from "./CardLayout";
import { getCards } from "./api";

const AllCards = () => {
  //aller chercher les données sur le server
  const result = useQuery(["cards", 0], getCards);

  return (
    <CardLayout title="Voir les cartes existantes" class="existingCards">
      {!result.isLoading &&
        result.data.map((cardItem) => (
          <ExistingCard key={cardItem.id} cardItem={cardItem} />
        ))}
    </CardLayout>
  );
};

export default AllCards;

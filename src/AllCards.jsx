import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import CardLayout from "./CardLayout";
import { getCards } from "./api";

const AllCards = () => {
  //aller chercher les données sur le server
  const result = useQuery(["cards"], getCards);

  return (
    <CardLayout title="Voir les cartes existantes" class="existingCards">
      {!result.isLoading &&
        result.data.map((cardItem) => (
          <Card key={cardItem.id} cardItem={cardItem} isExisting={true} />
        ))}
    </CardLayout>
  );
};

export default AllCards;

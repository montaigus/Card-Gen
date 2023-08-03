import { useQuery } from "@tanstack/react-query";
import Card from "./CardComponent";
import CardLayout from "./CardLayout";
import { getCards } from "./api";
import { allCardTypes } from "./cardTypes";

const AllCards = (): JSX.Element => {
  //aller chercher les données sur le server
  const result = useQuery(["cards"], getCards);

  return (
    <CardLayout title="Voir les cartes existantes" class="existingCards">
      {!result.isLoading &&
        result.data.map((cardItem: allCardTypes) => (
          <Card key={cardItem.id} cardItem={cardItem} isExisting={true} />
        ))}
    </CardLayout>
  );
};

export default AllCards;

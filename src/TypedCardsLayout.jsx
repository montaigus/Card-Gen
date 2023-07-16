import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import CardLayout from "./CardLayout";
import { getCards } from "./api";
import { Monstre, Sort } from "./cardTypes";

const TypedCardsLayout = (props) => {
  //majuscule sur la première lettre
  function capitalizeFirst(string) {
    return (string = string.charAt(0).toUpperCase() + string.slice(1));
  }
  const cardsType = props.type;
  //aller chercher les données sur le server
  const result = useQuery(["cards", { type: props.type }], getCards);

  const createNewCard = (type) => {
    switch (type) {
      case "monstre":
        return new Monstre();

      case "sort":
        return new Sort();
    }
  };

  const newCard = createNewCard(props.type);

  return (
    <CardLayout
      title={capitalizeFirst(props.type)}
      class={`typedCards ${props.type}`}
    >
      <div className="newContainer">
        <Card key={newCard.id} cardItem={newCard} isExisting={false} />
      </div>
      <div className="existingContainer">
        {!result.isLoading &&
          result.data.map((cardItem) => (
            <Card key={cardItem.id} cardItem={cardItem} isExisting={true} />
          ))}
      </div>
    </CardLayout>
  );
};

export default TypedCardsLayout;

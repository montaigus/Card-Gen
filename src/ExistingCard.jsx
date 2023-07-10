import { useState } from "react";
import CardLayout from "./CardLayout";
import FormLayout from "./FormLayout";

const ExistingCard = (props) => {
  const cardType = props.cardItem["type"];
  const [locked, setLocked] = useState(true);

  function toggleModif(event) {
    setLocked(!locked);
  }

  return (
    <CardLayout
      title={props.cardItem.nom}
      class={cardType}
      existing={true}
      locked={locked}
      toggleModif={toggleModif}
      cardItem={props.cardItem}
    >
      <FormLayout
        cardItem={props.cardItem}
        locked={locked}
        existing={true}
        toggleModif={toggleModif}
      ></FormLayout>{" "}
    </CardLayout>
  );
};

export default ExistingCard;

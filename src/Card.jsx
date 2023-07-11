import { useState } from "react";
import CardLayout from "./CardLayout";
import FormLayout from "./FormLayout";

const Card = (props) => {
  const cardType = props.cardItem["type"];
  const [locked, setLocked] = useState(props.isExisting);

  function toggleModif(event) {
    setLocked(!locked);
  }

  return (
    <CardLayout
      title={props.cardItem.nom}
      class={cardType}
      existing={props.isExisting}
      locked={locked}
      toggleModif={toggleModif}
      cardItem={props.cardItem}
    >
      <FormLayout
        cardItem={props.cardItem}
        locked={locked}
        existing={props.isExisting}
        toggleModif={toggleModif}
      ></FormLayout>{" "}
    </CardLayout>
  );
};

export default Card;

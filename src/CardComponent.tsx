import { useState } from "react";
import CardLayout from "./CardLayout";
import FormLayout from "./FormLayout";
import { allCardTypes } from "./cardTypes";

type CardComponentProps = {
  cardItem: allCardTypes;
  key: number;
  isExisting: boolean;
};

const CardComponent = (props: CardComponentProps): JSX.Element => {
  const cardType: string = props.cardItem["type"];
  const [locked, setLocked] = useState(props.isExisting);

  //!Pas bien, mais void ne conviens pas
  function toggleModif(): any {
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

export default CardComponent;

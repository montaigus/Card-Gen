import { useState } from "react";
import CardLayout from "./CardLayout";

const ExistingCard = (props) => {
  const [existingCard, setExistingCard] = useState(props.cardItem);
  const cardType = props.cardItem["type"];
  const [locked, setLocked] = useState(true);

  function toggleModif(event) {
    setLocked(!locked);
  }

  //le containe
  return (
    <CardLayout
      title={existingCard.nom}
      class={cardType}
      existing={true}
      locked={locked}
      toggleModif={toggleModif}
    >
      <form className="cardForm" id={props.cardItem.id}>
        <div className="divItem">
          {Object.entries(existingCard)
            .filter(([key]) => key !== "id" && key !== "type")
            .map(([key, value]) => (
              <label htmlFor={key} key={key}>
                {key + " du " + cardType}
                <input
                  id={key}
                  value={value}
                  type={key === "nom" ? "text" : "number"}
                  onChange={(e) =>
                    setExistingCard((state) => ({
                      ...state,
                      [key]: e.target.value,
                    }))
                  }
                  disabled={locked}
                ></input>
              </label>
            ))}
        </div>
        {!locked && (
          <div className="divButton">
            <button className="okButton">OK !</button>
          </div>
        )}
        {locked && (
          <div className="divButton">
            <button className="modifButton" onClick={toggleModif}>
              Modifier
            </button>
          </div>
        )}
      </form>
    </CardLayout>
  );
};

export default ExistingCard;

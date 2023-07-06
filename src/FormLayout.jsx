import { useState } from "react";
import writeCards from "./writeCards";
import { useQuery } from "@tanstack/react-query";

const FormLayout = (props) => {
  const cardType = props.cardItem.type;
  const [cardItem, setCardItem] = useState(props.cardItem);

  function labelizeStat(string) {
    switch (string) {
      case "nom":
        return "Nom";
        break;
      case "pv":
        return "Points de vie";
        break;
      case "pc":
        return "Points de combat";
        break;
      case "dmg":
        return "Dégats";
        break;
      case "init":
        return "Initiative";
        break;

      default:
        break;
    }
  }

  function capitalizeFirst(string) {
    return (string = string.charAt(0).toUpperCase() + string.slice(1));
  }

  return (
    <form
      className="cardForm"
      id={cardItem.id}
      onSubmit={(e) => {
        e.preventDefault();
        if (window.confirm()) {
          writeCards(cardItem, props.existing);
        }
      }}
    >
      <div className="divItem">
        {Object.entries(cardItem)
          .filter(([key]) => key !== "id" && key !== "type")
          .map(([key, value]) => (
            <label htmlFor={key} key={key}>
              {labelizeStat(key) + " du " + capitalizeFirst(cardType)}
              <input
                id={key}
                value={value}
                type={key === "nom" ? "text" : "number"}
                onChange={(e) =>
                  setCardItem((state) => ({
                    ...state,
                    [key]: e.target.value,
                  }))
                }
                disabled={props.locked}
              ></input>
            </label>
          ))}
      </div>
      {!props.locked && (
        <div className="divButton">
          <button className="okButton">OK !</button>
        </div>
      )}
      {props.existing && props.locked && (
        <div className="divButton">
          <button className="modifButton" onClick={props.toggleModif}>
            Modifier
          </button>
        </div>
      )}
    </form>
  );
};

export default FormLayout;

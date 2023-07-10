import { useState } from "react";
import { writeCard } from "./api";

// toutes les props utilisées : cardItem,
// existing (boolean pour savoir si c'est une carte déjà existante)
//locked (pour verouiller ou non le formulaire)
//toggleModif (fonction du parent pour switch le locked)
const FormLayout = (props) => {
  const cardType = props.cardItem.type;
  const [cardItem, setCardItem] = useState(props.cardItem);

  //Pour afficher les nom de propriété en bon français
  function labelizeStat(string) {
    switch (string) {
      case "pv":
        return "Points de vie";
      case "pc":
        return "Points de combat";
      case "dmg":
        return "Dégats";
      case "init":
        return "Initiative";

      default:
        return capitalizeFirst(string);
        break;
    }
  }

  //majuscule sur la première lettre
  function capitalizeFirst(string) {
    return (string = string.charAt(0).toUpperCase() + string.slice(1));
  }

  const confirmMsg = () => {
    let msg = "Vous allez";
    props.existing ? (msg += " modifier :") : (msg += " créer:");

    msg += "\n\n";
    Object.entries(cardItem).forEach(([key, value]) => {
      if (key === "id") return;
      msg += `${labelizeStat(key)} : ${value}\n`;
    });
    msg += "\nEst-ce ok ?";
    return msg;
  };

  return (
    <form
      className="cardForm"
      id={cardItem.id}
      onSubmit={(e) => {
        e.preventDefault();
        if (window.confirm(confirmMsg())) {
          writeCard(cardItem, props.existing);
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

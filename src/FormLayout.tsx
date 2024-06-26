import { useState } from "react";
import { writeCard } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { allCardTypes } from "./cardTypes";

// toutes les props utilisées : cardItem,
// existing (boolean pour savoir si c'est une carte déjà existante)
//locked (pour verouiller ou non le formulaire)
//toggleModif (fonction du parent pour switch le locked)

type FormLayoutProps = {
  cardItem: allCardTypes;
  existing: boolean;
  locked: boolean;
  //TODO à modifier quand je saurai quoi mettre
  toggleModif: any;
};

const FormLayout = (props: FormLayoutProps): JSX.Element => {
  const cardType = props.cardItem.type;
  const [cardItem, setCardItem] = useState(props.cardItem);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: writeCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  //Pour afficher les nom de propriété en bon français
  function labelizeStat(string: string): string {
    switch (string) {
      case "pv":
        return "Points de vie";
      case "pc":
        return "Points de combat";
      case "dmg":
        return "Dégats";
      case "init":
        return "Initiative";
      case "cost":
        return "Coût en mana";

      default:
        return capitalizeFirst(string);
    }
  }

  //majuscule sur la première lettre
  function capitalizeFirst(string: string): string {
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
      id={cardItem.id.toString()}
      onSubmit={(e) => {
        e.preventDefault();
        if (window.confirm(confirmMsg())) {
          mutation.mutate({ cardItem, isExisting: props.existing });
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

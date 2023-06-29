import { useState } from "react";
import CardLayout from "./CardLayout";

const NewCard = (props) => {
  const cardType = "Monstre";

  const [newCard, setNewCard] = useState({
    id: Date.now(),
    type: cardType,
    nom: "",
    pv: 0,
    pc: 0,
  });

  return (
    <CardLayout title="Nouvelle carte" class={cardType}>
      <form className="cardForm" method="POST" action="/new">
        <div className="divItem">
          {Object.entries(newCard)
            .filter(([key]) => key !== "id" && key !== "type")
            .map(([key, value]) => (
              <label htmlFor={key} key={key}>
                {key + " du " + cardType}
                <input
                  id={key}
                  type={key === "nom" ? "text" : "number"}
                  value={value}
                  onChange={(e) =>
                    setNewCard((state) => ({
                      ...state,
                      [key]: e.target.value,
                    }))
                  }
                ></input>
              </label>
            ))}
        </div>
        <div className="divButton">
          <button className="okButton">OK !</button>
        </div>
      </form>
    </CardLayout>
  );
};

export default NewCard;

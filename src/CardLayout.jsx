import { useState } from "react";
import deleteCard from "./deleteCard";

// props utilisées :
// class (utilisée notamment pour la couleur du header)
// existing (boolean pour savoir si c'est une carte déjà existante)
//locked (pour verouiller ou non le formulaire)
//toggleModif (fonction du parent pour switch le locked)
// title (titre du header)

const CardLayout = (props) => {
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility(event) {
    setVisibility(!visibility);
  }

  return (
    <div className="container">
      <div className={`itemHeader ${props.class}`} onClick={toggleVisibility}>
        {props.existing && !props.locked && (
          <button className="abortButton" onClick={props.toggleModif}>
            &larr;
          </button>
        )}
        <div>{props.title}</div>
        {props.existing && !props.locked && (
          <button
            className="destroyButton"
            onClick={deleteCard(props.cardItem.id)}
          >
            &#x1F5D1;
          </button>
        )}
      </div>
      {visibility && <div className="divForm">{props.children}</div>}{" "}
    </div>
  );
};

export default CardLayout;

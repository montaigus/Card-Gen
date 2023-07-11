import { useState } from "react";
import { destroyCard } from "./api";
import { motion, AnimatePresence } from "framer-motion";

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

  function confirmMsg(cardItem) {
    let msg = "Attention !\nVous allez détruire :\n";
    msg += `${cardItem.type} : ${cardItem.nom}`;
    return msg;
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
            onClick={() => {
              if (confirm(confirmMsg(props.cardItem))) {
                destroyCard(props.cardItem.id);
              }
            }}
          >
            &#x1F5D1;
          </button>
        )}
      </div>
      <AnimatePresence>
        {visibility && (
          <motion.div
            className="divForm"
            layout="preserve-aspect"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
            exit={{ height: 0 }}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardLayout;

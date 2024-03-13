import { PropsWithChildren, useState } from "react";
import { destroyCard } from "./api";
import { motion, AnimatePresence } from "framer-motion";
import { allCardTypes } from "./cardTypes";

type CardLayoutProps = {
  class: string;
  existing?: boolean;
  locked?: boolean;
  //TODO a modifier quand j'en saurai plus
  toggleModif?: any;
  title: string;
  cardItem?: allCardTypes;
};

const CardLayout = (props: PropsWithChildren<CardLayoutProps>): JSX.Element => {
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility(e: any) {
    if (e.target.tagName === "BUTTON") return;
    setVisibility(!visibility);
  }

  function confirmMsg(cardItem: allCardTypes) {
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
              if (props.cardItem && confirm(confirmMsg(props.cardItem))) {
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

import { useState } from "react";
import deleteCard from "./deleteCard";

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

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

  //---

  //les deux boutons du header (abort and destroy)
  //const abortButton = document.createElement("button");
  //abortButton.classList.add("abortButton");
  //abortButton.innerHTML = "&larr;";
  //abortButton.style.display = "none";
  //abortButton.onclick = function (event) {
  //  event.stopPropagation();
  //  modifClick(abortButton, true);
  //};

  //const labelDiv = document.createElement("div");
  //labelDiv.innerHTML = cardItem["nom"];

  //const destroyButton = document.createElement("button");
  //destroyButton.classList.add("destroyButton");
  //destroyButton.innerHTML = "&#x1F5D1;";
  //destroyButton.style.display = "none";
  //destroyButton.onclick = async function (event) {
  //  if (confirm("Vous allez supprimer cet élément !!")) {
  //    const promise = await fetch(serverUrl + "/destroy", {
  //      method: "POST",
  //      body: JSON.stringify({ id: cardItem["id"] }),
  //      headers: { "content-type": "application/json" },
  //    });
  //    const processedPromise = await promise.json();
  //    return processedPromise;
  //  }
  //
  //  event.stopPropagation();
  //};

  //appendChild

  //--

  //le formulaire
  //const lockedForm = document.createElement("div");
  //lockedForm.classList.add("divForm");
  //lockedForm.classList.add("locked");
  //header.onclick = function () {
  //  headerClick(lockedForm);
  //};
  //
  //const formItself = document.createElement("form");
  //formItself.classList.add("cardForm");
  //formItself.method = "POST";
  //formItself.action = "/modif";
  //formItself.id = cardItem["id"];
  //formItself.onsubmit = function () {
  //  return okClickModif(formItself);
  //};

  //Les données affichées
  //const divItem = document.createElement("div");
  //divItem.classList.add("divItem");

  //pour chaque propriété de la carte, création des inputs
  // Object.keys(cardItem).forEach((key) => {
  //   if (key === "id" || key === "type") return;
  //
  // //les labels
  // const labelKey = document.createElement("label");
  // labelKey.classList.add("inputLabel");
  // labelKey.classList.add(key);
  // labelKey.innerHTML =
  //   labelizeStat(key) + " du " + capitalizeFirst(cardItem["type"]);
  //
  // divItem.appendChild(labelKey);
  //
  // //les inputs
  // const inputKey = document.createElement("input");
  // inputKey.classList.add("inputCard");
  // inputKey.classList.add(key);
  // inputKey.disabled = true;
  // if (key == "nom") inputKey.type = "text";
  // else inputKey.type = "number";
  // inputKey.value = cardItem[key];
  // inputKey.placeholder = labelizeStat(key) + "...";
  //
  // divItem.appendChild(inputKey);
  //});

  //le bouton OK
  //const okDiv = document.createElement("div");
  //okDiv.classList.add("divButton");
  //okDiv.style.display = "none";
  //const okButton = document.createElement("button");
  //okButton.classList.add("okButton");
  //okButton.innerHTML = "OK !";
  //okDiv.appendChild(okButton);
  //
  ////AppendChild du formulaire
  //formItself.appendChild(divItem);
  //formItself.appendChild(okDiv);
  //lockedForm.appendChild(formItself);

  //---

  //le boutton modifier
  //const modDiv = document.createElement("div");
  //modDiv.classList.add("divButton");
  //
  //const modButton = document.createElement("button");
  //modButton.classList.add("modifButton");
  //modButton.innerHTML = "Modifier";
  //modButton.onclick = function () {
  //  modifClick(modButton, false);
  //};
  //
  //modDiv.appendChild(modButton);
  //lockedForm.appendChild(modDiv);
};

export default ExistingCard;

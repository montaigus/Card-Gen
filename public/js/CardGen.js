function Monstre(type, nom, pv, pc, dmg, init) {
    this.type = type;
    this.nom = nom;
    this.pv = pv;
    this.pc = pc;
    this.dmg = dmg;
    this.init = init;
}

const zombie = new Monstre(
    "Monstre",
    "Zombie",
    10,
    2,
    4,
    2
);

const rat = new Monstre(
    "Monstre",
    "Rat",
    2,
    5,
    1,
    4
)

const serverUrl = "http://localhost:8000"
const cardsUrl = serverUrl + "/cards"

let allMonsters



async function getMonsters() {
    const promise = await fetch(cardsUrl)
    const processedResponse = await promise.json()
    allMonsters = processedResponse
    allMonsters.forEach(monstre => divFormExisting.appendChild(renderCard(monstre)))

}


const divFormExisting = document.querySelector(".divForm.existingCards")
getMonsters();


function renderCard(cardItem) {

    //le container
    const newCardElement = document.createElement("div")
    newCardElement.classList.add("container")

    //---

    //le header
    const header = document.createElement("div")
    header.classList.add("itemHeader")
    header.classList.add(cardItem["type"])


    //les deux boutons du header (abort and destroy)
    const abortButton = document.createElement("button")
    abortButton.classList.add("abortButton")
    abortButton.innerHTML = "&larr;"
    abortButton.style.display = "none"
    abortButton.onclick = function (event) {
        event.stopPropagation();
        modifClick(abortButton, true);
    }

    const labelDiv = document.createElement("div")
    labelDiv.innerHTML = cardItem["nom"]


    const destroyButton = document.createElement("button")
    destroyButton.classList.add("destroyButton")
    destroyButton.innerHTML = "&#x1F5D1;"
    destroyButton.style.display = "none"
    destroyButton.onclick = async function (event) {
        if (confirm("Vous allez supprimer cet élément !!")) {
            const promise = await fetch(serverUrl + "/destroy", {
                method: "POST",
                body: JSON.stringify({ id: cardItem["id"] }),
                headers: { 'content-type': 'application/json' }
            });
            const processedPromise = await promise.json();
            return processedPromise;
        }

        event.stopPropagation();
    }

    //appendChild
    header.appendChild(abortButton)
    header.append(labelDiv)
    header.appendChild(destroyButton)
    newCardElement.appendChild(header)

    //--

    //le formulaire
    const lockedForm = document.createElement("div")
    lockedForm.classList.add("divForm")
    lockedForm.classList.add("locked")
    header.onclick = function () { headerClick(lockedForm) }


    const formItself = document.createElement("form")
    formItself.classList.add("cardForm")
    formItself.method = "POST"
    formItself.action = "/modif"
    formItself.id = cardItem["id"]
    formItself.onsubmit = function () {
        return okClickModif(formItself)
    }

    //Les données affichées
    const divItem = document.createElement("div")
    divItem.classList.add("divItem")

    //pour chaque propriété de la carte, création des inputs
    Object.keys(cardItem).forEach(key => {

        if (key === "id" || key === "type") return;

        //les labels
        const labelKey = document.createElement("label")
        labelKey.classList.add("inputLabel")
        labelKey.classList.add(key)
        labelKey.innerHTML = labelizeStat(key) + " du " + capitalizeFirst(cardItem["type"])

        divItem.appendChild(labelKey)

        //les inputs
        const inputKey = document.createElement("input")
        inputKey.classList.add("inputCard")
        inputKey.classList.add(key)
        inputKey.disabled = true
        if (key == "nom") inputKey.type = "text";
        else inputKey.type = "number";
        inputKey.value = cardItem[key]
        inputKey.placeholder = labelizeStat(key) + "...";

        divItem.appendChild(inputKey)
    }
    )

    //le bouton OK
    const okDiv = document.createElement("div")
    okDiv.classList.add("divButton")
    okDiv.style.display = "none"
    const okButton = document.createElement("button")
    okButton.classList.add("okButton")
    okButton.innerHTML = "OK !"
    okDiv.appendChild(okButton)

    //AppendChild du formulaire
    formItself.appendChild(divItem)
    formItself.appendChild(okDiv)
    lockedForm.appendChild(formItself)


    //---

    //le boutton modifier
    const modDiv = document.createElement("div")
    modDiv.classList.add("divButton")

    const modButton = document.createElement("button")
    modButton.classList.add("modifButton")
    modButton.innerHTML = "Modifier"
    modButton.onclick = function () {
        modifClick(modButton, false)
    }

    modDiv.appendChild(modButton)
    lockedForm.appendChild(modDiv)

    newCardElement.appendChild(lockedForm)

    return newCardElement;
}






function okClick(form) {
    let newMonstre = new Monstre();
    const allInputs = Array.from(form.getElementsByTagName("input"));
    allInputs.forEach(element => {
        switch (element.id) {
            case "nom":
                newMonstre.nom = element.value;
                break;
            case "pc":
                newMonstre.pc = element.value;
                break;
            case "pv":
                newMonstre.pv = element.value;
                break;
            case "init":
                newMonstre.init = element.value;
                break;

            default:
                break;
        }
    });

    let alertText = "Vous allez créer : \n"
        + "\n"
        + "nom : " + newMonstre.nom + "\n"
        + "pv : " + newMonstre.pv + "\n"
        + "pc : " + newMonstre.pc + "\n"
        + "initiative : " + newMonstre.init + "\n"
        + "\nC'est bon ?";

    return window.confirm(alertText);

}

function okClickModif(form) {
    let newMonstre = new Monstre();
    const allInputs = Array.from(form.getElementsByTagName("input"));
    allInputs.forEach(element => {
        switch (element.classList[1]) {
            case "nom":
                newMonstre.nom = element.value;
                break;
            case "pc":
                newMonstre.pc = element.value;
                break;
            case "pv":
                newMonstre.pv = element.value;
                break;
            case "dmg":
                newMonstre.dmg = element.value;
                break;
            case "init":
                newMonstre.init = element.value;
                break;

            default:
                break;
        }
    });

    let alertText = "Vous allez modifier : \n"
        + "\n"
        + "nom : " + newMonstre.nom + "\n"
        + "pv : " + newMonstre.pv + "\n"
        + "pc : " + newMonstre.pc + "\n"
        + "dmg : " + newMonstre.dmg + "\n"
        + "initiative : " + newMonstre.init + "\n"
        + "\nC'est bon ?";


    return window.confirm(alertText)
}

function modifClick(button, isHeader) {
    let lockedElement;
    if (isHeader) lockedElement = button.parentElement.parentElement.querySelector(".divForm");
    else lockedElement = button.closest(".divForm");

    lockedElement.classList.toggle('locked');

    const lockedInputs = lockedElement.querySelectorAll("input");
    lockedInputs.forEach(
        function (item) {
            item.disabled = lockedElement.classList.contains('locked');
        }
    )

    toggleDisplay(lockedElement, ".okButton", true);
    toggleDisplay(lockedElement, ".modifButton", true);
    toggleDisplay(lockedElement, ".abortButton", false);
    toggleDisplay(lockedElement, ".destroyButton", false);


}

function toggleDisplay(item, targetClass, targetParent) {
    let divButtonO;
    if (targetParent) {
        divButtonO = item.querySelector(targetClass).parentElement;
    }
    else {
        divButtonO = item.parentElement.querySelector(targetClass);
    }

    divButtonO.style.display = divButtonO.style.display === 'none' ? '' : 'none';
}



//Attribue le click sur les header
function setHeaderClick() {
    const itemHeaderList = document.querySelectorAll(".itemHeader");
    itemHeaderList.forEach(
        function (value) {
            value.addEventListener("click", function (header) {
                const collapseDiv = header.currentTarget.parentElement.querySelector(".divForm");

                if (collapseDiv.style.height === "100%") {
                    collapseDiv.style.height = "0px";
                }
                else {
                    collapseDiv.style.height = "100%";
                }
            }
            )
        }
    )
}

setHeaderClick()

function headerClick(collapseDiv) {
    {
        if (collapseDiv.style.height === "100%") {
            collapseDiv.style.height = "0px";
        }
        else {
            collapseDiv.style.height = "100%";
        }
    }
}

//bloque tous les éléments locked
// function lockStart() {
//     const lockedElementsStart = document.querySelectorAll(".locked");
//     lockedElementsStart.forEach(
//         function (item) {
//             //Bloque tous les inputs locked
//             const lockedInputsStart = item.querySelectorAll("input");
//             lockedInputsStart.forEach(
//                 function (item) {
//                     item.disabled = true;
//                 }
//             )
//             //Enleve les bouton locked       
//             toggleDisplay(item, ".okButton", true)
//             toggleDisplay(item, ".abortButton", false)
//             toggleDisplay(item, ".destroyButton", false)

//         }
//     )
// }
// lockStart();



function capitalizeFirst(string) {
    return string = string.charAt(0).toUpperCase() + string.slice(1);
}

function labelizeStat(string) {
    switch (string) {
        case "nom":
            return "Nom"
            break
        case "pv":
            return "Points de vie"
            break;
        case "pc":
            return "Points de combat"
            break;
        case "dmg":
            return "Dégats"
            break;
        case "init":
            return "Initiative"
            break;

        default:
            break;
    }
}

const objString = JSON.stringify(zombie);




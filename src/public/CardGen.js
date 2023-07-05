function Monstre(type, nom, pv, pc, dmg, init) {
  this.type = type;
  this.nom = nom;
  this.pv = pv;
  this.pc = pc;
  this.dmg = dmg;
  this.init = init;
}

const zombie = new Monstre("Monstre", "Zombie", 10, 2, 4, 2);

const rat = new Monstre("Monstre", "Rat", 2, 5, 1, 4);

const serverUrl = "http://localhost:8000";
const cardsUrl = serverUrl + "/cards";

let allMonsters;

async function getMonsters() {
  const promise = await fetch(cardsUrl);
  const processedResponse = await promise.json();
  allMonsters = processedResponse;
  allMonsters.forEach((monstre) =>
    divFormExisting.appendChild(renderCard(monstre))
  );
}

const divFormExisting = document.querySelector(".divForm.existingCards");
getMonsters();

function okClick(form) {
  let newMonstre = new Monstre();
  const allInputs = Array.from(form.getElementsByTagName("input"));
  allInputs.forEach((element) => {
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

  let alertText =
    "Vous allez créer : \n" +
    "\n" +
    "nom : " +
    newMonstre.nom +
    "\n" +
    "pv : " +
    newMonstre.pv +
    "\n" +
    "pc : " +
    newMonstre.pc +
    "\n" +
    "initiative : " +
    newMonstre.init +
    "\n" +
    "\nC'est bon ?";

  return window.confirm(alertText);
}

function okClickModif(form) {
  let newMonstre = new Monstre();
  const allInputs = Array.from(form.getElementsByTagName("input"));
  allInputs.forEach((element) => {
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

  let alertText =
    "Vous allez modifier : \n" +
    "\n" +
    "nom : " +
    newMonstre.nom +
    "\n" +
    "pv : " +
    newMonstre.pv +
    "\n" +
    "pc : " +
    newMonstre.pc +
    "\n" +
    "dmg : " +
    newMonstre.dmg +
    "\n" +
    "initiative : " +
    newMonstre.init +
    "\n" +
    "\nC'est bon ?";

  return window.confirm(alertText);
}

const objString = JSON.stringify(zombie);

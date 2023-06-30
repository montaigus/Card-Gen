import CardLayout from "./CardLayout";
import FormLayout from "./FormLayout";

function Monstre(type, nom, pv, pc, dmg, init) {
  this.id = Date.now();
  this.type = type;
  this.nom = nom;
  this.pv = pv;
  this.pc = pc;
  this.dmg = dmg;
  this.init = init;
}

const NewCard = (props) => {
  const cardType = "monstre";

  const newCard = new Monstre(cardType, "", 0, 0, 0, 0);

  return (
    <CardLayout title={`Nouvelle carte ${cardType}`} class={cardType}>
      <FormLayout cardItem={newCard}></FormLayout>
    </CardLayout>
  );
};

export default NewCard;

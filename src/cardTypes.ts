export class CardBase {
  id: number;
  type: string;
  nom: string;

  constructor(type: string, name: string) {
    this.id = Date.now();
    this.type = type;
    this.nom = name;
  }
}

interface Character {
  pv: number;
  pc: number;
  init: number;
}

export class Monstre extends CardBase implements Character {
  pv: number;
  pc: number;
  dmg: number;
  init: number;

  constructor() {
    super("monstre", "Nouveau monstre");
    this.pv = 0;
    this.pc = 0;
    this.dmg = 0;
    this.init = 0;
  }
}

export class Sort extends CardBase {
  dmg: number;
  cost: number;
  constructor() {
    super("sort", "Nouveau sort");
    this.dmg = 0;
    this.cost = 0;
  }
}

export type allCardTypes = Monstre | Sort | CardBase;

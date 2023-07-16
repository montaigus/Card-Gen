export class Monstre {
  id: number;
  type: string;
  nom: string;
  pv: number;
  pc: number;
  dmg: number;
  init: number;

  constructor(value?: {}) {
    this.id = Date.now();
    this.type = "monstre";
    this.nom = "Nouveau monstre";
    this.pv = 0;
    this.pc = 0;
    this.dmg = 0;
    this.init = 0;
  }
}

export class Sort {
  id: number;
  type: string;
  nom: string;
  dmg: number;
  cm: number;
  constructor() {
    this.id = Date.now();
    this.type = "sort";
    this.nom = "Nouveau sort";
    this.dmg = 0;
    this.cm = 0;
  }
}

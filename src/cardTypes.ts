export function Monstre(nom, pv, pc, dmg, init) {
  this.id = Date.now();
  this.type = "monstre";
  this.nom = nom;
  this.pv = pv;
  this.pc = pc;
  this.dmg = dmg;
  this.init = init;
}

export function Sort(nom, dmg, cm) {
  this.id = Date.now();
  this.type = "sort";
  this.nom = nom;
  this.dmg = dmg;
  this.cm = cm;
}

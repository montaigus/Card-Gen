function Monstre(nom, pv, pc, dmg, init) {
  this.id = Date.now();
  this.type = "monstre";
  this.nom = nom;
  this.pv = pv;
  this.pc = pc;
  this.dmg = dmg;
  this.init = init;
}

import express from "express";
import morgan from "morgan";
import bp from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let cardsObject;

import { readFile, writeFile } from "fs/promises";

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));

app.post("/new", (req, res) => {
  let newMonstre = new Monstre(
    req.body.nom,
    +req.body.pv,
    +req.body.pc,
    +req.body.dmg,
    +req.body.init
  );
  cardsObject.push(newMonstre);
  const jsonToWrite = JSON.stringify(cardsObject, null, 3);
  writeFile(new URL("./Cards.json", import.meta.url), jsonToWrite);

  res.statusCode(200);
});

app.post("/modif", (req, res) => {
  const sentMonstre = req.body;
  console.log(req);
  console.log(sentMonstre);
  console.log(cardsObject);
  const modifiedMonstre = cardsObject.find(
    (item) => (item.id = sentMonstre.id)
  );
  console.log(modifiedMonstre);

  res.statusCode(200);
});

app.post("/destroy", (req, res) => {
  const id = req.body;
  console.log(req);
  console.log(req.body);
  const destroyedMonstre = cardsObject.find((item) => (item.id = id));
  console.log(destroyedMonstre);

  res.statusCode(200);
});

app.get("/cards", async (req, res) => {
  const cardsJson = await readFile(
    new URL("Cards.json", import.meta.url),
    "utf-8"
  );
  cardsObject = JSON.parse(cardsJson);

  res.json(cardsObject);
});

app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.listen(8000, () => {
  console.log("server on");
});

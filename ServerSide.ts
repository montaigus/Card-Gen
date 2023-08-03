import express from "express";
import morgan from "morgan";
import bp from "body-parser";
import cors from "cors";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let cardsObject: allCardTypes[];

import { readFile, writeFile } from "fs/promises";
import { readFileSync, writeFileSync } from "fs";
import { allCardTypes } from "./src/cardTypes";

process.on("uncaughtException", (e) => {
  console.log(e);
});

const cardsUrl = new URL("./Cards.json", import.meta.url);

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/cards", async (req, res) => {
  const cardsJson = await readFile(cardsUrl, "utf-8");
  const type = req.query.type;
  cardsObject = JSON.parse(cardsJson);
  const filteredCards = cardsObject.filter((item) => item.type === type);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(filteredCards);
});

// ? N'est plus nécessaire en dev -> server vite
// ? Le serait potentiellement en build -> fichiers statiques HTML + CSS + JS

// app.use(express.static(__dirname + "/public"));

app.listen(8000, () => {
  console.log("server on");
});

app.post("/destroy", (req, res) => {
  const id = req.body.id;
  cardsObject = cardsObject.filter((item) => item.id !== id);
  const jsonToWrite = JSON.stringify(cardsObject, null, 2);
  writeFileSync(cardsUrl, jsonToWrite);

  res.statusCode = 200;
});

app.post("/write", (req, res) => {
  const cardItem: allCardTypes = req.body;
  //Si la carte est nouvelle

  if (req.query.new && +req.query.new === 1) {
    cardsObject.push(cardItem);
  }
  //Si la carte est modifiée
  else if (req.query.new && +req.query.new === 0) {
    cardsObject[cardsObject.findIndex((item) => item.id === cardItem.id)] =
      cardItem;
  } else {
    console.log("erreur");
    res.statusCode = 500;
    return;
  }
  const jsonToWrite = JSON.stringify(cardsObject, null, 2);
  writeFileSync(cardsUrl, jsonToWrite);
  res.header("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
});

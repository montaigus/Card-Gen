import express from "express";
import morgan from "morgan";
import bp from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let cardsObject;

import { readFile, writeFile } from "fs/promises";
import { readFileSync, writeFileSync } from "fs";
import cors from "cors";

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));
app.use(cors());

app.post("/destroy", (req, res) => {
  const id = req.body.id;
  cardsObject = cardsObject.filter((item) => item.id !== id);
  const jsonToWrite = JSON.stringify(cardsObject, null, 2);
  writeFile(new URL("./Cards.json", import.meta.url), jsonToWrite);

  res.statusCode = 200;
});

app.post("/write", (req, res) => {
  const cardItem = req.body;
  if (+req.query.new === 1) {
    cardsObject.push(cardItem);
  } else if (+req.query.new === 0) {
    cardsObject[cardsObject.findIndex((item) => item.id === cardItem.id)] =
      cardItem;
  } else {
    console.log("erreur");
    res.statusCode = 500;
    return;
  }
  const jsonToWrite = JSON.stringify(cardsObject, null, 2);
  writeFileSync(new URL("./Cards.json", import.meta.url), jsonToWrite);
  res.header("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
});

app.get("/cards", async (req, res) => {
  const cardsJson = await readFile(
    new URL("./Cards.json", import.meta.url),
    "utf-8"
  );
  cardsObject = JSON.parse(cardsJson);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(cardsObject);
});

// ? N'est plus nécessaire en dev -> server vite
// ? Le serait potentiellement en build -> fichiers statiques HTML + CSS + JS

// app.use(express.static(__dirname + "/public"));

app.listen(8000, () => {
  console.log("server on");
});

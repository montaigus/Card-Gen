function Monstre(nom, pv, pc, dmg, init) {
    this.id = Date.now();
    this.type = "monstre";
    this.nom = nom;
    this.pv = pv;
    this.pc = pc;
    this.dmg = dmg;
    this.init = init;
}

import http from 'http'
import express from "express"
import morgan from 'morgan'
import bp from 'body-parser'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let cardsObject

import { readFile, writeFile } from "fs/promises";

process.on("uncaughtException", (e) => {
    console.log(e)
})

const app = express()

app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(morgan('dev'))

app.post("/new", (req, res) => {

    let newMonstre = new Monstre(
        req.body.nom,
        +req.body.pv,
        +req.body.pc,
        +req.body.dmg,
        +req.body.init
    )
    cardsObject.push(newMonstre)
    const jsonToWrite = JSON.stringify(cardsObject, null, 3)
    writeFile(new URL("./Cards.json", import.meta.url), jsonToWrite)
})

app.post("/modif", (req, res) => {
    const sentMonstre = req.body
    console.log(req)
    console.log(sentMonstre)
    console.log(cardsObject)
    const modifiedMonstre = cardsObject.find(item => item.id = sentMonstre.id)
    console.log(modifiedMonstre)

    res
})

app.post("/destroy", (req, res) => {
    const id = req.body
    console.log(req)
    console.log(req.body)
    const destroyedMonstre = cardsObject.find(item => item.id = id)
    console.log(destroyedMonstre)
})

app.get("/cards", async (req, res) => {
    const cardsJson = await readFile(new URL('Cards.json', import.meta.url), "utf-8")
    cardsObject = JSON.parse(cardsJson)

    res.json(cardsObject)
})



app.use(express.static(__dirname + '/public'))

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/public/index.html")
// })

app.listen(8000, () => {
    console.log("server on")
})


function renderCard(cardItem) {

    //le container
    const newCardElement = document.createElement("div")
    newCardElement.classList.add("container")

    //---

    //le header
    const header = document.createElement("div")
    header.classList.add("itemHeader")
    header.classList.add("monstre")
    //header.innerHTML = cardItem["nom"]

    //les deux boutons du header (abort and destroy)
    const abortButton = document.createElement("button")
    abortButton.classList.add("abortButton")
    abortButton.innerHTML = "&larr;"
    abortButton.onclick = function (event) {
        event.stopPropagation();
        modifClick(abortButton, true);
    }

    const labelDiv = document.createElement("div")
    labelDiv.innerHTML = cardItem["nom"]


    const destroyButton = document.createElement("button")
    destroyButton.classList.add("destroyButton")
    destroyButton.innerHTML = "&#x1F5D1;"
    destroyButton.onclick = function (event) {
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

    const formItself = document.createElement("form")
    formItself.classList.add("cardForm")
    formItself.onsubmit = function () {
        return okClickModif(formItself)
    }

    //Les données affichées
    const divItem = document.createElement("div")
    divItem.classList.add("divItem")


    let cardType;

    //pour chaque propriété de la carte, création des inputs
    Object.keys(cardItem).forEach(key => {

        if (key == "type") {
            cardType = cardItem[key]
            return;
        }

        //les labels
        const labelKey = document.createElement("label")
        labelKey.classList.add("inputLabel")
        labelKey.classList.add(key)
        labelKey.innerHTML = labelizeStat(key) + " du " + capitalizeFirst(cardType)

        divItem.appendChild(labelKey)

        //les inputs
        const inputKey = document.createElement("input")
        inputKey.classList.add("inputCard")
        inputKey.classList.add(key)
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


// const needToWrite = true
// if (needToWrite) {
//     const jsonToWrite = JSON.stringify(cardsObject, null, 3)
//     await writeFile(new URL("./Cards.json", import.meta.url), jsonToWrite)
// }






















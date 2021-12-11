const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { sendFile } = require("express/lib/response");

const servapi = "/api/data";

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());

//==========================================

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pasha147223s@gmail.com",
    pass: "@P1471472v",
  },
});

async function sendF() {
  await transporter.sendMail({
    from: "pasha147223s",
    to: "pasha147223@gmail.com",
    subject: "Node js",
    text: "",
    attachments: [{ filename: "text.txt", path: "./text.txt" }],
  });
  const date = new Date();
  const dateStr =
    `${date.getFullYear()}.${date.getMonth()}.` +
    `${date.getDate()} ${date.getHours()}:` +
    `${date.getMinutes()}:${date.getSeconds()}`;

  fs.writeFile("./text.txt", dateStr, (err) => {
    if (err) {
      throw err;
    }
    console.log("File has been refreshed");
  });
}

// это всё код middleware
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*"); // разрешает принимать запросы со всех доменов
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // какие методы в запросах разрешается принимать
  res.append("Access-Control-Allow-Headers", "Origin, Content-Type");

  next();
});

//POST
app.post("/api/data/:id", (req, res) => {
  // console.log("Serv POST params>>", req.params.id);
  console.log("Serv POST body", req.body);
  let response = "";
  if (req.body.name === "Pasha147") {
    if (req.body.text === "HiBySend") {
      console.log(`Hi Pasha! Send messages`);
      sendF();
    }
  } else {
    const str = `\n${req.body.date} ${req.body.name}>>> ${req.body.text}`;
    fs.appendFile("./text.txt", str, (err) => {
      if (err) {
        throw err;
      }
      console.log("Seved to file");
    });
  }

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

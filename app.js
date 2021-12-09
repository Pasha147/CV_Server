const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const servapi = "/api/data";

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());

//==========================================
let db = [];

async function sendDb(db) {
  // let testEmailAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pasha147223s@gmail.com",
      pass: "@P1471472v",
    },
  });

  let letter = db
    .map((item, index) => {
      const str = `${item.name} \n ${item.date} \n ${item.text}\n\n`;
      return str;
    })
    .join(" ");

  await transporter.sendMail({
    from: "pasha147223s",
    to: "pasha147223@gmail.com",
    subject: "Node js",
    text: letter,
  });
}
//============================================

// это всё код middleware
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*"); // разрешает принимать запросы со всех доменов
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // какие методы в запросах разрешается принимать
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type" // X-Requested-With, Content-Type, Accept"
  );
  // res.append("Access-Control-Max-Age", "2");
  // res.append("Access-Control-Allow-Credentials", "true");
  // res.append("Vary", "Origin");
  next();
});

//GET
// app.get(servapi, (req, res) => {
//   console.log("server get>>");
//   //   console.log("req.params>>", req.params.id);
//   //   console.log("req.body>>", req.body);
//   let data = { a: 2, b: 4 };
//   res.json(data);
// });

//POST
app.post("/api/data/:id", (req, res) => {
  // console.log("Serv POST params>>", req.params.id);
  console.log("Serv POST body", req.body);
  // res.setHeader();
  let response = "";
  if (req.body.name === "Pasha147") {
    if (req.body.text === "HiBy") {
      console.log(`Hi Pasha! You have ${db.length} messages`);
      response = `You have ${db.length} messages`;
    }
    if (req.body.text === "HiBySend") {
      console.log(`Hi Pasha! To send messages`);
      response = `You have ${db.length} messages`;
      sendDb(db);
    }
  } else {
    if (db.length > 200) {
      db = db.slice(100, db.length);
    }
    db.push(req.body);
    response = `N:${db.length} The message from ${req.body.name} was received at ${req.body.date}`;
  }

  res.status(200).json(response);
});

// app.use(express.static(path.resolve(__dirname, "frontend")));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

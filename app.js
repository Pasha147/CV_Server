const express = require("express");
// const { request } = require("http");
// const cors = require("cors");
const path = require("path");

//const servapi = "https://myserverpf.herokuapp.com/api/data";
const servapi = "/api/data";

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(express.json());

/* //Позволяет обойти защиту cors
 const corsOptions = {
   origin: "*", // домен сервиса, с которого будут приниматься запросы
   optionsSuccessStatus: 200, // для старых браузеров
 };

 app.use(cors(corsOptions)); // если не указать corsOptions, то запросы смогут слать все запросы
*/
// это всё код middleware
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*"); // разрешает принимать запросы со всех доменов
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // какие методы в запросах разрешается принимать
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type"
    // "Content-Type" // X-Requested-With, Content-Type, Accept"
  );
  // res.append("Access-Control-Max-Age", "2");
  // res.append("Access-Control-Allow-Credentials", "true");
  //res.append("Vary", "Origin");
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
  console.log("Serv POST params>>", req.params.id);
  console.log("Serv POST body", req.body);
  // res.setHeader();
  res.status(200).json({ a: 3, b: 3 });
});

// app.use(express.static(path.resolve(__dirname, "frontend")));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("toUpperCase", text => text.toUpperCase());

// ZAZENI SERVER Z @nodemon server.js -e js,hbs

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world!</h1>");
// });

// app.get("/", (req, res) => {
//   res.send({
//     name: "Gregor",
//     likes: ["Biking", "Citis"]
//   });
// });

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.path} ${req.xhr}`;

  fs.appendFile("server.log", log + "\n", error => {
    if (error) {
      console.log("Cant save to log file.");
    }
  });
  console.log(log);
  next();
});

// MAINTENANCE MODE
// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "Maintenance Page"
//   });
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Hello to our site"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});
app.get("/portfolio", (req, res) => {
  res.render("portfolio.hbs", {
    pageTitle: "Portfolio Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Something went wrong!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

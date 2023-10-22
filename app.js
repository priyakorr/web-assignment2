//  app.js , PRIYA SHRUTHI KORRA
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const secureRoutes = require("./routes/secure");
const User = require("./model/user");
const Contact = require("./model/contact");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.use("/", routes);
app.use("/", secureRoutes);

// remove this after adding user
app.get("/add-user", (req, res) => {
  const newUser = new User({
    username: "priya",
    password: "pass",
    email: "priya@gmail.com",
  });

  newUser
    .save()
    .then((savedUser) => {
      console.log("User added:", savedUser);
      res.send("User added successfully");
    })
    .catch((error) => {
      console.error("Error adding user:", error);
      res.status(500).send("Error adding user");
    });
});

// remove this after adding data
// Route to generate and add random contacts to the database
app.get("/generate-contacts", (req, res) => {
  const numContactsToAdd = 10;
  const contactsToAdd = generateRandomContacts(numContactsToAdd);

  Contact.insertMany(contactsToAdd)
    .then(() => {
      console.log(`${numContactsToAdd} contacts added successfully`);
      res.send(`${numContactsToAdd} contacts added successfully`);
    })
    .catch((error) => {
      console.error("Error adding contacts:", error);
      res.status(500).send("Error adding contacts");
    });
});

// Function to generate random contacts
function generateRandomContacts(numContacts) {
  const contacts = [];
  const names = ["John", "Jane", "Mark", "Emily", "Michael"];
  const domains = ["example.com", "test.com", "company.com"];

  for (let i = 0; i < numContacts; i++) {
    const contact = new Contact({
      contactName: names[Math.floor(Math.random() * names.length)],
      contactNumber: Math.floor(Math.random() * 1000000000).toString(),
      email: `${Math.random().toString(36).substring(7)}@${
        domains[Math.floor(Math.random() * domains.length)]
      }`,
    });

    contacts.push(contact);
  }

  return contacts;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Contact = require("../model/contact");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  // Extract the username and password from the form data
  const { username, password } = req.body;

  // Find the user in the database by username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        // User not found, redirect back to the login view with an error message
        return res.redirect("/login?error=1");
      }

      // Compare the password from the form data with the stored password
      if (password === user.password) {
        // Passwords match, retrieve the contacts from the database
        res.redirect("/contacts");
      } else {
        // Passwords do not match, redirect back to the login view with an error message
        return res.redirect("/login?error=1");
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      // Redirect to an error page or display an error message
      res.redirect("/error");
    });
});

router.get("/contacts", (req, res) => {
  Contact.find({}, "contactName contactNumber email")
    .then((contacts) => {
      // Render the secureContact.ejs view with the contacts
      return res.render("secureContact", { contacts });
    })
    .catch((error) => {
      console.error("Error retrieving contacts:", error);
      // Redirect to an error page or display an error message
      res.redirect("/error");
    });
});

router.get("/update-delete/:id", (req, res) => {
  const { id } = req.params;

  // Fetch the contact data from the database based on the ID
  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        // Handle case where contact is not found
        return res.redirect("/contacts?error=1");
      }

      res.render("update-delete", { contact });
    })
    .catch((error) => {
      console.error("Error retrieving contact:", error);
      // Redirect to an error page or display an error message
      res.redirect("/error");
    });
});

// PUT route for updating contact
router.put("/update-delete/:id", (req, res) => {
  const { id } = req.params;

  // Fetch the contact data from the database based on the ID
  Contact.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect("/contacts");
    })
    .catch((error) => {
      console.error("Error updating contact:", error);
      // Redirect to an error page or display an error message
      res.redirect("/error");
    });
});

// DELETE route for deleting contact
router.delete("/update-delete/:id", (req, res) => {
  const { id } = req.params;

  // Delete the contact from the database based on the ID
  Contact.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/contacts");
    })
    .catch((error) => {
      console.error("Error deleting contact:", error);
      // Redirect to an error page or display an error message
      res.redirect("/error");
    });
});

module.exports = router;

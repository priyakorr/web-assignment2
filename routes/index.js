// index.js , PRIYA SHRUTHI KORRA

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/projects", (req, res) => {
  res.render("projects");
});

router.get("/services", (req, res) => {
  res.render("services");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/submit", (req, res) => {
  res.redirect("/");
});

router.get("/download/resume", (req, res) => {
  const resumePath = "public/resume.pdf";

  res.download(resumePath, "resume.pdf", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while downloading the resume.");
    }
  });
});

module.exports = router;

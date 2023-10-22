const mongoose = require("mongoose");

// Define the contact schema
const contactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Create the contact model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

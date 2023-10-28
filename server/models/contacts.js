let mongoose = require('mongoose');

//create a model class
let contactsModel = mongoose.Schema({
    Contact_Name: String,
    Contact_Number: Number,
    Email_Address: String
},
{
    collections: "contacts"
});

module.exports = mongoose.model('Contacts', contactsModel);
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect with our model
let Contacts = require('../models/contacts');


router.get('/', (req, res, next) => {
    Contacts.find((err, ContactList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('contacts/list', { title: 'Business Contact', ContactList: ContactList });
        }
    });
});

/* Get Route for displaying the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
    res.render('contacts/add', { title: 'Add Business Contact' });
});

/* Post Route for processing the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
    const newContacts = new Contacts({
        "Contact_Name": req.body.Contact_Name,
        "Contact_Number": req.body.Contact_Number,
        "Email_Address": req.body.Email_Address
    });

    newContacts.save((err, contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // Refresh the Business Contact list
            res.redirect('/contact-list');
        }
    });
});

/* Get Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;

    Contacts.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // Show edit view
            res.render('contacts/edit', { title: "Edit Business Contact", contact: contactToEdit });
        }
    });
});

/* Post Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {
    const id = req.params.id;

    const updatedContacts = {
        "Contact_Name": req.body.Contact_Name,
        "Contact_Number": req.body.Contact_Number,
        "Email_Address": req.body.Email_Address
    };

    Contacts.findByIdAndUpdate(id, updatedContacts, (err, contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // Refresh the Business Contact List
            res.redirect('/contact-list');
        }
    });
});

/* Get Route to perform Deletion - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    Contacts.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // Refresh the Business Contact List
            res.redirect('/contact-list');
        }
    });
});

module.exports = router;
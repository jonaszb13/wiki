const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    console.log("working_3")
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user) {
            res.render('register', { title: 'Registrieren', message: "Benutzer bereits registriert"})
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateUsername,
};
module.exports = verifySignUp;
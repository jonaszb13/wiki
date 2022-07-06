const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicanteUsername = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if(user) {
            res.status(400).send({ message: "Benutzer bereits registriert"})
            return;
        }
        next();
    });
};
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Rolle ${req.body.roles[i]} existiert nicht`
                });
                return;
            }
        }
    }
    next();
};
const verifySignup = {
    checkDuplicanteUsername,
    checkRolesExisted
};
module.exports = verifySignup;
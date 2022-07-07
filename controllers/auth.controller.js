const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
console.log("working_1");
exports.signup = (req, res) => {
    console.log("working");
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    });
    console.log(user)
    user.save((err, user) => {
        if(err) {
            res.status(500).send({ message: err});
            return;
        }
        if (req.body.roles) {
            Role.find(
                {
                    name: {$in: req.body.roles}
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({message: err});
                            return;
                        }
                        res.send({ message: "Benutzer erfolgreich registriert"});
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if(err) {
                    res.status(500).send({ message: err});
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err});
                        return;
                    }
                    res.send({ message: "Benutzer erfolgreich registriert"});
                });
            });
        }
    });
};
exports.signin = (req, res) => {
    console.log("working_2")
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "Benutzer nicht gefunden"});
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Falsches Passwort"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                roles: authorities,
                accessToken: token
            });
        });
};
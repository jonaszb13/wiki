const mongoose = require("mongoose");
const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
);
console.log(Role)
module.exports = Role;
exports.allAccess = (req, res) => {
    res.status(200).send("Öffentlicher Bereich");
};
exports.userBoard = (req, res) => {
    res.status(200).send("Benutzer Bereich");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Bereich");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Bereich");
};
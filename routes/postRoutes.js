const express = require('express');
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const bcrypt = require("bcrypt");
const app = express();
const router = express.Router();

router.get("/:id", (req, res, next) => {
    var payload = {
        pageTitle: "Tweet",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id
    }
    res.status(200).render("postPage", payload);
})

module.exports = router;
const express = require('express');
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

router.get("/images/:path", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../uploads/images/" + req.params.path));
});

module.exports = router;
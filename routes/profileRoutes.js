const express = require('express');
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const bcrypt = require("bcrypt");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

router.get("/", (req, res, next) => {
    var payload = {
        pageTitle: req.session.user.firstName + " " + req.session.user.lastName,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: req.session.user
    }
    res.status(200).render("profilePage", payload);
})

router.get("/:username", async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user);
    res.status(200).render("profilePage", payload);
})

router.get("/:username/replies", async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "replies";
    res.status(200).render("profilePage", payload);
})

router.get("/:username/following", async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "following";
    res.status(200).render("followersAndFollowing", payload);
})

router.get("/:username/followers", async (req, res, next) => {
    var payload = await getPayload(req.params.username, req.session.user);
    payload.selectedTab = "followers";
    res.status(200).render("followersAndFollowing", payload);
})

async function getPayload(username, userLoggedIn) {
    let user;

    if (mongoose.Types.ObjectId.isValid(username)) {
        user = await User.findById(username);
    } else {
        user = await User.findOne({ username: username });
    }

    if (user == null) {
        return {
                pageTitle: "Profile",
                userLoggedIn: userLoggedIn,
                userLoggedInJs: JSON.stringify(userLoggedIn)
        };
    }

    return {
        pageTitle: user.firstName + " " + user.lastName,
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
        profileUser: user
    };
}

module.exports = router;
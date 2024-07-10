const express = require('express');
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const Chat = require('../schemas/ChatSchema');
const bcrypt = require("bcrypt");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

router.get("/", (req, res, next) => {
    res.status(200).render("inboxPage", {
        pageTitle: "Inbox",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
})

router.get("/new", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
})

router.get("/:chatId", async (req, res, next) => {
    var userId = req.session.user._id;
    var chatId = req.params.chatId;
    var isValidId = mongoose.isValidObjectId(chatId);

    var payload = {
        pageTitle: "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    };

    if(!isValidId){
        payload.errorMessageChat = "Chat does not exist or you do not have permission to view it.";
        return res.status(200).render("chatPage", payload);
    }

    var chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId }}})
    .populate("users");

    if(chat == null) {
        var userFound = await User.findById(chatId);

        if(userFound != null) {
            chat = await getChatByUserId(userFound._id, userId);
        }
    }

    if(chat == null) {
        payload.errorMessageChat = "Chat does not exist or you do not have permission to view it.";
    }
    else {
        payload.chat = chat;
    }

    res.status(200).render("chatPage", payload);
})

function getChatByUserId(userLoggedInId, otherUserId) {
    return Chat.findOneAndUpdate({
        isGroupChat: false,
        users: {
            $size: 2,
            $all: [
                { $elemMatch: { $eq: new mongoose.Types.ObjectId(userLoggedInId) }},
                { $elemMatch: { $eq: new mongoose.Types.ObjectId(otherUserId) }}
            ]
        }
    },
    {
        $setOnInsert: {
            users: [userLoggedInId, otherUserId]
        }
    },
    {
        new: true,
        upsert: true
    })
    .populate("users");
}


module.exports = router;
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const User = require('../../schemas/UserSchema');
const Post = require('../../schemas/PostSchema');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.put("/:userId/follow", async (req, res, next) => {
    var userId = req.params.userId;
    var user = await User.findById(userId);
    if (user == null) return res.sendStatus(404);
    var isFollowing = user.followers && user.followers.includes(req.session.user._id);
    res.status(200).send(isFollowing);
})

module.exports = router;
const mongoose = require("mongoose");

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://admin:147258369@twitterclonecluster.fxv0btu.mongodb.net/?retryWrites=true&w=majority&appName=TwitterCloneCluster")
        .then(() => {
            console.log("Database connection successfull!");
        })
        .catch((err) => {
            console.log("Database connection error!!" + err);
        })
    }
}

module.exports = new Database(); 
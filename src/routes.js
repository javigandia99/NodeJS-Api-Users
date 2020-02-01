module.exports = app => {
    const user = require("./controller.js");
    var router = require("express").Router();

    // Create a new user
    router.post("/", user.create);

    //Update user 
    router.put("/:username", user.update)

    //Delete user by username
    router.delete("/:username", user.delete);

    // Retrieve all users
    router.get("/", user.findAll);

    //Delete all users
    router.delete("/", user.deleteAll);

    app.use('/users', router);
};
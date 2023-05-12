const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //////////
    app.get(
        "/api/user/get_All",
        controller.findAllUsers
    )

    app.get(
        "/api/user/get_one/:id",
        controller.findOneUser
    )

    app.post(
        "/api/user/create",
        controller.createUser
    );

    app.put(
        "/api/user/update/:id",
        controller.updateUser
    );

    app.delete(
        "/api/user/delete/:id",
        controller.deleteUser
    );

};
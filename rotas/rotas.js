module.exports = app => {
    const controlador = require("../controladores/controller.js");

    var router = require("express").Router();

    router.get("/boxoffice", controlador.findAll);

    router.get("/boxoffice/:siteID", controlador.findAll_specificSite);

    router.post("/registar", controlador.registar);

    router.post("/login", controlador.login);
   
    app.use('/', router);
}
module.exports = (app) =>{
    var monedas = require("../controladores/moneda.controlador");
    //metodo qe obtiene una moneda
    app.get("/monedas/:id",monedas.obtener);

    app.get("/monedas", monedas.listar);
}
var Moneda = require("../modelos/moneda.modelo");
//obtener una moneda

exports.obtener = (req, res) => {
    Moneda.obtener(req.params.id, (err, data) => {

        //verificar si hub error
        if (err) {
            if (err.tipo == "No encontrado") {
                res.status(404).send({ message: `No se encontro moneda con el id ${req.params.id};` });
            }
            else {
                res.status(500).send({ message: `Error obteniendo la monda con el id ${req.params.id};` });
            }
        }
        else {
            res.send(data);
        }
    });
}

//obtener lista solicitud fespuesta
exports.listar = (req, res) => {
    Moneda.listar((err, data) => {

        //verificar si hub error
        if (err) {

            res.status(500).send({ message: `Error obteniendo lista dde monedaas` });
        }

        else {
            res.send(data);
        }
    });
}

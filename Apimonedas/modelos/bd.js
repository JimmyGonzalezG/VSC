//cargar libreria para operar con bd mysql
var mysql = require('mysql');
//cargar archivo de configuracion
var configbd = require("../configuracion/bd.config");
//crear la conexion
var conexion = mysql.createConnection({
    host: configbd.SERVIDOR,
    user: configbd.USUARIO,
    passsword: configbd.CLAVE,
    database: configbd.BASEDATOS,
});

//abrir la conexxion a la base de datos
conexion.connect((error) => {
    if (error) throw err;

    console.log("conexion exitosa");
}

);
module.exports = conexion;



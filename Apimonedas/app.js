const express = require('express');
const app = express();
const puerto = 3010;
app.get('/', (req, res) => {
    res.send("servicio de bd monedas funcionando");
});

require("./rutas/moneda.rutas")(app);

app.listen(puerto, () => {
    console.log(`servico de bd monedas escuchando en http://localhost:${puerto}`);
});
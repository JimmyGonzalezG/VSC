//cargar el modelo de conexion a la bd
var sql= require('./bd');
//constructor
var Moneda = function(moneda){
    this.id=moneda.Id;
    this.moneda=moneda.Moneda;
    this.sigla=moneda.Sigla;
    this.simbolo=moneda.Simbolo;
    this.emisor=moneda.Emisor;
}

Moneda.obtener =(idMoneda, resultado)=>{

        sql.query(`SELECT * FROM Monedas WHERE id=${idMoneda};`, (err,res)=>{
            //altgr }
            //verificar si hubo error en la consulta
            if(err){
                console.log("Error buscando moneda: " ,err);
                resultado(err,null);
                return;
            }
            //la consulta devuelve resultados
            if(res.lenght){
                console.log("Moneda encontarda : ", res[0]);
                resultado(null,res[0]);
                return;
            }
            //NO se encontaron regitros
            resultado({tipo:"No encontardo"},null);
        });

        Moneda.listar=(resultado)=>{
            sql.query(`CALL spListarMonedas;`, (err,res)=>{
                //altgr }
                //verificar si hubo error en la consulta
                if(err){
                    console.log("Error buscando listando monedas: " ,err);
                    resultado(err,null);
                    return;
                }
               
                //NO se encontaron regitros
                console.log("lista de nedas encontradas: ", res[0]);
                resultado(null,res[0]);
            });


        };
     

}
module.exports=Moneda;
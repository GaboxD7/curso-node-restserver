const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middelwares();
        // Rutas de mi aplicacion
        this.routes();
       
    }

    middelwares(){
        // Cors
        this.app.use( cors());
        //Lectura y parseo del Body
        this.app.use(express.json());
        
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

      // this.app.use('/api/usuarios', require('../routers/user'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));           

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port );
            });
    }






}

module.exports = Server;

//Aca vamos a tener la configuracion del servidor
import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

//Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold('Conexion correcta a la DB'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Hubo un error en la DB'))
    }
}
connectDB()

//Instancia de express
const server = express();

//Seguridad y permitir conexiones - Y esto: corsOptions : CorsOptions es para un buen autocompletado
//estos son mis funciones propias de mi proyecto. Con el origin podemos controlar quien hace la pedicion.
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        //console.log(origin)
        if(origin === process.env.FRONTEND_URL) {
            //console.log('Permitir')
            callback(null, true)
        } else {
            //console.log('Denegar')
            callback(new Error('Error de CORS'), null)
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json()) //-> esto es un Middleware

server.use(morgan('dev')) //nos da detalles de lo que se esta ejecutando, haciendo, te da info, de las consultas, tiene los diferentes modo para logear
server.use('/api/products', router); //-> esto es un Middleware

// server.get('/api', (req, res) => {
//     res.json({msg: 'Desde API'})
// })

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server;
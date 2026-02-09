import { exit } from 'node:process' //va a terminar la ejecucion de nodejs
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1) //porque al menos debe tener un error si salta aca
    }

}

if(process.argv[2] === '--clear') {
    clearDB()
}
// console.log(process.argv)


//ES UNA PRUEBA DE PRACTICA
// describe('Nuestro primer test', () => {
//     //Aca se puede usar dos sintaxis test() o it(), es lo mismo, es para poner las pruebas a analizar
//     it('Debe revisar que 1 + 1 sean 2', () => {
//         expect(1 + 1).toBe(2)
//     })
//     it('Debe revisar que 1 + 1 no sean 2', () => {
//         expect(1 + 1).not.toBe(3)
//     })
// })
import request from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

//should send back a json response -> deberia enviar una repuesta json
// describe('GET/api', () => {
//     it('should send back a json response', async () => {
//         const res = await request(server).get('/api')
//         // console.log(res)
//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)
//         console.log(res.body.msg)
//         expect(res.body.msg).toBe("Desde API")

//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe("desde api")
//     })
// })

jest.mock('../config/db') //-> lo que hace es simular la conexion a la db 
describe('connectDB', () => {
    it('should handle database connection error', async () => {
        //Por eso se crea un espia
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error en la DB'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error en la DB')
        )
    })
})
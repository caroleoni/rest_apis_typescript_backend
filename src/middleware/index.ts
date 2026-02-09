//Siempre que se trabaja con Middleware tienes que tener res, req, la paticion http, forma parte de lo que el usuario envia y responde
//son funciones intermedias que se ejecutan en cada request del tipo http
import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator"

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
      let errors = validationResult(req) //para que pueda leer los campos que ingresamos con el req
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
    
    next();
}
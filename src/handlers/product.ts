import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProduct = async (req: Request, res: Response) => {
    const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({data : products})
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
        const product = await Product.findByPk(id);
        if(!product) {
           return res.status(404).json({
            error: 'Producto no encontrado'
           })
        }
        res.json({data: product})
    
}

export const createProduct = async (req: Request, res: Response) => {

    //Instanciamos un nuevo Producto, cuando se instancia tiene el objeto nuevo sin el id, el id lo crea la db
    // const product = new Product(req.body);
    // //con await esperamos que lo almacenen, y luego tira la data
    // const savedProduct = await product.save();
    //res.json({data: savedProduct})

    // //Validacion: con este-> run(req) -> de esta forma recupera lo que nosotros enviamos al servidor, para que entre esta validacion
    // await check('name')
    //     .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    //     .run(req);
    // await check('price')
    //     .isNumeric().withMessage('Valor no válido')
    //     .notEmpty().withMessage('El precio del producto no puede ir vacio')
    //     .custom( value => value > 0).withMessage('Precio no válido')
    //     .run(req); -> esta aca la validacion y en el router, en ambos dos

    //hay otra forma mas simple y mejor, se instancia con un metodo create y a su vez se crea el objeto
    const product = await Product.create(req.body)
        res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json('ID no Válido')
    }
    //Actualizar
    await product.update(req.body)
    //Luego lo almacena en la db
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    //Actualizar
    //await product.update(req.body) o se puede hacer
    product.availability = !product.dataValues.availability
    //Luego lo almacena en la db
    await product.save()

    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}
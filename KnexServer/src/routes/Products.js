const express = require('express')
const router = express.Router()
const ProductManager = require('../manager/Products')
const adminMiddleware = require('../middlewares/Admin')
const uploader = require('../services/Upload')

const productService = new ProductManager()

/* TRAER TODOS LOS PRODUCTOS */
router.get('/', (req, res) => {
    productService.getAll().then(result => res.send(result) )
})

/* TRAER PROD POR ID */
router.get('/:id', (req, res) => {
    let id = req.params.id
    productService.getById(id).then(result => res.send(result) )
})

/* AGREGAR PRODUCTO */
router.post('/', uploader.single('file'), (req, res) => {
    let product = req.body
    let file = req.file
    if(!file) return res.status(500).send({error:'Not uploaded file'})
    product.thumbnail = req.protocol+'://'+req.hostname+':8080/img/'+file.filename
    console.log(product)
    productService.add(product).then(result => res.send(result))
})

/* ACTUALIZAR PRODUCTO */
router.put('/:id', adminMiddleware,(req, res) => {
    const id = req.params.id
    const productUpdated = req.body;
    if( id < 0 || isNaN(id) ) return res.status(400).send({ error:"error", message:"Product Id is incorrect" })
    
    productService.updateProduct(id, productUpdated).then(result => res.send(result))
})

/* ELIMINAR PRODUCTO */
router.delete('/:id', adminMiddleware, (req, res) => {
    let id = req.params.id
    productService.deleteById(id).then(result => res.send(result) )
})

module.exports = router
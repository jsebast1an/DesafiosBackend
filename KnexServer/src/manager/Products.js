const database = require('../mysql/db.js')

class ProductManager {
    getAll = async () => {
        try {
            let product = await database("products").select("*")
            return {status:"success", payload: product}
        } catch (error) {
            return {status: error}
        }   
    }
    getById = async (id) => {
        if(!id) return {status:"error", message: "Id field missing"}
        try {
            let product = await database("products").where("id", id)
            if(product) return {status:"success", payload: product}
            else return {status: null, message: "product not found"}
        } catch (error) {
            return {status: error}
        }   
    }

    add = async(product) => {
        try {
            if (product.name === undefined) return {message: "error: name needed"}
            if (isNaN(product.price)) return {message: "error: price needed"}
            const productAdded = await database("products").insert(product)
            return {status:'added 1 product', productAdded}
        } catch (error) {
            return {status: error, message:'imposible to insert product'}
        }
    }

    deleteById = async(id) => {
        try {
            let data = await database("products").where('id', id).del()
            return {status:"success", message:"product deleted", data}
        } catch (error) {
            return {status:error}
        }
    }

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await database("products").where('id', id).update(updatedProduct)
        return { status: "success", message: "Product updated", data }
    }
}

module.exports = ProductManager;
import express from 'express';
import { ProductManager } from "./productManager.js"

const app = express();
const productManager = new ProductManager();
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server UP en puerto ${PORT}`);
})

app.get('/', (req, res) => {
    res.redirect('/products')
});

app.get('/products', async(req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    limit && !isNaN(parseInt(limit))? res.status(200).json(products.slice(0,parseInt(limit))) : res.status(200).json(products);
});

app.get('/products/:pid', async(req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid)

    product ? res.status(200).json(product) :  res.status(404).json({message: 'El producto ingresado no existe'});
 });


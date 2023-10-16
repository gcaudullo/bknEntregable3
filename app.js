const express = require('express');
const ProductManager = require('./entregable3');

const app = express();
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager('./products.json');


app.get('/products', (req, res) => {
    const { query } = req;
    const { limit } = query;
    productManager.getProducts()
        .then(products => {
            if (!limit) {
                res.json(products);
            } else {
                const result = products.slice(0, parseInt(limit));
                res.status(200).json(result);
            }
        })
        .catch(error => {
            console.error(error);
        });
});

app.get('/products/:pId', (req, res) => {
    const { pId } = req.params;
    productManager.getProductById(parseInt(pId))
    .then(product => {
        if (product === 'Product Not found! 😨') {
            res.status(404).json({ error: product });
        } else {
            res.json(product);
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo producto.' });
    });
});


app.listen(8080, () => {
    console.log('Servidor http escuchando en el puerto 8080')
})
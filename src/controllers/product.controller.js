import { Product } from "../models/product.model.js"

export async function createProduct(req, res) {
    try {
        const { name, description, category, price, stock } = req.body

        if (!name || !stock || !price) {
            return res.status(400).json({ message: "All required fields are needed." })
        }

        const newProduct = await Product.create(
            {
                productName: name,
                description,
                category,
                price: {
                    amount: Number(price)
                },
                stock: Number(stock)
            }
        )

        if (!newProduct) {
            return res.status(500).json({ message: "Product is not created in DB" })
        }

        return res.status(201).json({
            message: "Product created",
            newProduct
        })
    } catch (error) {
        console.log("Error is createProduct: ", error);
        return res.status(500).json({ error: "Error is createProduct:" })
    }
}


export async function getProducts(req, res) {
    try {
        const products = await Product.find()
        return res.json({ products })
    } catch (error) {
        console.log("Error is getProducts: ", error);
        res.status(500).json({ error: "Error is getProducts:" })
    }
}

export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(402).json({ message: "No id is found" })
        }
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ message: "No Product is found for this ID!" })
        }
        return res.status(200).json({ message: "Product Matched.", data: product })
    } catch (error) {
        console.log("Error is getProductById: ", error);
        res.status(500).json({ error: "Error is getProductById:" })
    }
}

export async function updateProductById(req, res) {
    try {
        const { id } = req.params;
        const { name, description, category, price, stock } = req.body;

        if (!id) {
            return res.status(402).json({ message: "No id is found" })
        }

        if (!name || !stock || !price) {
            return res.status(400).json({ message: "All required fields are needed." })
        }
        const data =
        {
            productName: name,
            description,
            category,
            price: {
                amount: Number(price)
            },
            stock: stock
        }

        const updatedPoduct = await Product.findOneAndUpdate({ _id: id }, data, { returnDocument: "after" });
        if (!updatedPoduct) {
            return res.status(404).json({ message: "no product is find or update." })
        }
        return res.status(200).json({ message: "Updated successfully", updatedPoduct })
    } catch (error) {
        console.log("Error is updateProductById: ", error);
        res.status(500).json({ error: "Error is updateProductById:" })
    }
}

export async function deleteProductById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(402).json({ message: "No id is found" })
        }
        const isDelete = await Product.deleteOne({ _id: id });
        if (!isDelete) {
            return res.status(404).json({ messge: "NO product is Deleted." })
        }
        return res.status(200).json({ isDelete })
    } catch (error) {
        console.log("Error is deleteProductById: ", error);
        res.status(500).json({ error: "Error is deleteProductById:" })
    }
}
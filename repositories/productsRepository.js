const { products } = require("../models");

class ProductsRepository {
    static async create({ user_id, name, price, category, description, picture, isPublish, sold }) {
        const createdProduct = products.create({
            user_id,
            name,
            price,
            category,
            description,
            picture,
            isPublish,
            sold
        });

        return createdProduct;
    }

    static async getAll() {
        const getAll = await products.findAll();

        return getAll;
    }

    static async getProductById({ id
    }) {
        const getProduct = await products.findOne({
            where: {
                id
            }
        });

        return getProduct;
    }

    static async updateProductById({ id, name, price, category, description, picture, isPublish }) {
        const updateProductById = await products.update({
            name,
            price,
            category,
            description,
            picture,
            isPublish
        }, {
            where: {
                id
            }
        });

        return updateProductById;
    }

    static async deleteProductById({ id }) {
        const getProduct = products.destroy({
            where: {
                id
            }
        });

        return getProduct;
    }

}


module.exports = ProductsRepository;
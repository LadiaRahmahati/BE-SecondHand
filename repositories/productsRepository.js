const { products } = require("../models");
const { Op } = require("sequelize");

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
            sold,
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
    static async getAllProduct({
        name,
        isPublish,
        sold,
        category
    }) {

        const query = {
            where: {},
            like: {}
        }

        if (name) {
            const searchByName = await products.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + name + '%' } },
                    ]
                },
                limit: 10,
            });

            return searchByName;
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        if (category) {
            query.where = { ...query.where, category }
        }

        if (isPublish) {
            query.where = { ...query.where, isPublish }
        }

        const getAllProduct = await products.findAll(query);

        return getAllProduct;
    }

}




module.exports = ProductsRepository;
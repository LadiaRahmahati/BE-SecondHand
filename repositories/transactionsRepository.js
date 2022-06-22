const { transactions, products } = require("../models");

class TransactionRepository {
    static async create({ user_id, product_id }) {
        const createdWishlist = transactions.create({
            user_id,
            product_id
        });

        return createdWishlist;
    }

    static async getWishlistByUserId({ id, sold }) {
        const query = {
            where: {},
            include:[{
                model: products,
                attributes:["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (sold) {
            query.where = { ...query.where, sold }
        }

        const getWishlist = await transactions.findAll(query);

        return getWishlist;
    }

}

module.exports = TransactionRepository;
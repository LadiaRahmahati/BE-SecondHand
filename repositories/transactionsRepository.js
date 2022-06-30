const { transactions, products } = require("../models");

class transactionsRepository {
    static async create({ user_id, seller_id, product_id, bargain_price, accepted, rejected }) {
        const createdTransaction = transactions.create({
            user_id,
            seller_id,
            product_id,
            bargain_price,
            accepted,
            rejected
        });

        return createdTransaction;
    }

    static async getTransactionById({ id }) {
        const getTransaction = await transactions.findOne({ where: { id } });

        return getTransaction;
    }

    static async updateTransactionById({ id, user_id, seller_id, product_id, bargain_price, accepted, rejected }) {
        const updatedTransaction = await transactions.update(
            {
                user_id,
                seller_id,
                product_id,
                bargain_price,
                accepted,
                rejected
            },
            { where: { id } }
        );

        return updatedTransaction;
    }

    static async getTransactionByUserId({ id, accepted, rejected }) {
        const query = {
            where: {},
            include: [{
                model: products,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, user_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        if (rejected) {
            query.where = { ...query.where, rejected }
        }

        const getTransaction = await transactions.findAll(query);

        return getTransaction;
    }

    static async getTransactionBySellerId({ id, accepted, rejected }) {
        const query = {
            where: {},
            include: [{
                model: products,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = { ...query.where, seller_id: id }
        }

        if (accepted) {
            query.where = { ...query.where, accepted }
        }

        if (rejected) {
            query.where = { ...query.where, rejected }
        }

        const getTransaction = await transactions.findAll(query);

        return getTransaction;
    }
}

module.exports = transactionsRepository;
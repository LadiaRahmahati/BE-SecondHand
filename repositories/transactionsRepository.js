const { transactions, products } = require("../models");

class transactionsRepository {
    static async create({ user_id, seller_id, product_id, bargain_price, isRejected, isAccepted, isOpened }) {
        const createdTransaction = transactions.create({
            user_id,
            seller_id,
            product_id,
            bargain_price,
            isRejected,
            isAccepted,
            isOpened
        });

        return createdTransaction;
    }

    static async updateTransaction({
        id,
        user_id,
        seller_id,
        product_id,
        bargain_price,
        isRejected,
        isAccepted,
        isOpened
    }) {
        const updateTransaction = await transactions.update({
            user_id,
            seller_id,
            product_id,
            bargain_price,
            isRejected,
            isAccepted,
            isOpened
        }, {
            where: {
                id
            }
        });

        return updateTransaction;
    }


    static async getTransactionById({ id }) {
        const getTransaction = await transactions.findOne({ where: { id } });

        return getTransaction;
    }

    static async getTransactionByUserId({ id, isRejected, isAccepted, isOpened }) {
        const query = {
            where: {},
            include: [{
                model: products,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = {
                ...query.where,
                user_id: id
            }
        }
        if (isAccepted) {
            query.where = {
                ...query.where,
                isAccepted
            }
        }
        if (isRejected) {
            query.where = {
                ...query.where,
                isRejected
            }
        }

        const getTransaction = await transactions.findAll(query);

        return getTransaction;
    }

    static async getTransactionBySellerId({ id, isRejected, isAccepted, isOpened }) {
        const query = {
            where: {},
            include: [{
                model: products,
                attributes: ["picture", "name", "category", "price"]
            }]
        }

        if (id) {
            query.where = {
                ...query.where,
                owner_id: id
            }
        }
        if (isAccepted) {
            query.where = {
                ...query.where,
                isAccepted
            }
        }
        if (isRejected) {
            query.where = {
                ...query.where,
                isRejected
            }
        }


        const getTransaction = await transactions.findAll(query);

        return getTransaction;
    }

    static async getAllTransaction() {
        const getAllTransaction = await transactions.findAll();

        return getAllTransaction;
    }

}

module.exports = transactionsRepository;
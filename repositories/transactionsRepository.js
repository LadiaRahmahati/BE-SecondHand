const { transactions, products, users } = require("../models");
const { Op } = require("sequelize");


class transactionsRepository {
    static async createTransaction({
        user_id,
        seller_id,
        product_id,
        bargain_price,
        isRejected,
        isAccepted,
        isOpened
    }) {
        const createdProduct = transactions.create({
            user_id,
            seller_id,
            product_id,
            bargain_price,
            isRejected,
            isAccepted,
            isOpened
        });

        return createdProduct;
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
                seller_id: id
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

    static async getTransactionNotif({
        id,
        isAccepted,
        isRejected
    }) {
        const query = {
            where: {},
            include: [{
                model: products,
                attributes: ["name", "category", "price", "picture"]
            },
            {
                model: users,
                attributes: ["name", "email", "city", "address", "phoneNumber", "picture"]
            }]
        }

        if (id) {
            query.where = {
                ...query.where,
                [Op.or]: [ {seller_id: {[Op.eq]: id}}, {user_id: {[Op.eq]: id}} ]
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

        const getTransactionByUserId = await transactions.findAll(query);

        return getTransactionByUserId;
    }
}

module.exports = transactionsRepository;
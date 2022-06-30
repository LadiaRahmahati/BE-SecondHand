const transactionsService = require("../services/transactionsService");

const create = async (req, res, next) => {
    const { seller_id, product_id, bargain_price, accepted, rejected } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await transactionsService.create({
        user_id,
        seller_id,
        product_id,
        bargain_price,
        accepted,
        rejected
    });
    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const { seller_id, product_id, bargain_price, accepted, rejected } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await transactionsService.updateById({
        id,
        user_id,
        seller_id,
        product_id,
        bargain_price,
        accepted,
        rejected
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionByUserId = async (req, res, next) => {
    const { id } = req.params;
    const { accepted, rejected } = req.query;

    const { status, status_code, message, data } = await transactionsService.getTransactionByUserId({
            id,
            accepted,
            rejected
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionBySellerId = async (req, res, next) => {
    const { id } = req.params;
    const { accepted, rejected } = req.query;

    const { status, status_code, message, data } = await transactionsService.getTransactionBySellerId({
            id,
            accepted,
            rejected
        });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create, getTransactionByUserId, updateById, getTransactionBySellerId };
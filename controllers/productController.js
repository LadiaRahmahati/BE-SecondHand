const productsService = require("../services/productsService");

const create = async (req, res, next) => {
    const { name, price, category, description, } = req.body;

    const user_id = req.user.id;

    const { status, status_code, message, data } = await postsService.create({
        user_id,
        name,
        price,
        category,
        description,
        picture: req.uploaded_picture,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { create };
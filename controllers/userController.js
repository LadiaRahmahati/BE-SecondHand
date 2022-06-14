const userService = require("../services/userService");

const getById = async (req, res) => {
    const { id } = req.params;

    const { status, status_code, message, data } = await userService.getById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const { name, city, address, phoneNumber, } = req.body;

    const { status, status_code, message, data } = await userService.updateById({
        id,
        name,
        city,
        address,
        phoneNumber,
        picture: req.uploaded_image,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = { getById, updateById }
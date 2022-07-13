const usersRepository = require("../repositories/usersRepository");
const cloudinary = require("../utils/cloudinary");

class usersService {

    static async getAllUsers() {
        try {
            const getAllUsers = await usersRepository.getAllUsers();
            return {
                status: true,
                status_code: 200,
                message: "success get data",
                data: {
                    getdata: getAllUsers,
                },
            };
        }catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }


    static async getById({ id }) {
        try {
            const getById = await usersRepository.getById({
                id,
            });
            return {
                status: true,
                status_code: 200,
                message: "success get data",
                data: {
                    getdata: getById,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }

    static async updateById({ id, name, city, address, phoneNumber, picture }) {
        const getUsersById = await usersRepository.getById({
            id
        })

        if (getUsersById.id == id) {
            const fileBase64 = image.buffer.toString("base64");
            const file = `data:${image.mimetype};base64,${fileBase64}`;
            const cloudinaryImage = await cloudinary.uploader.upload(file);

            const updatedUsers = await usersRepository.updateById({
                id,
                name,
                city,
                address,
                phoneNumber,
                picture: cloudinaryImage.url,
            });

            return {
                status: true,
                status_code: 200,
                message: "users updated successfully",
                data: {
                    updated_users: updatedUsers,
                },
            };
        } else {
            return {
                status: true,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    updated_users: null,
                },
            };
        }

    }


    static async getProductBySellerId({ id, isPublish, sold }) {
        try {
            const getProducts = await usersRepository.getProductBySellerId({
                id,
                isPublish,
                sold
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    products: getProducts,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    data: null,
                },
            };
        }
    }
}

module.exports = usersService
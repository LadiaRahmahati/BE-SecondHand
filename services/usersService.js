const usersRepository = require("../repositories/usersRepository");

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
        try {
            const updatedProducts = await usersRepository.updateById({
                id,
                name,
                city,
                address,
                phoneNumber,
                picture,
            });

            return {
                status: true,
                status_code: 200,
                message: "users updated successfully",
                data: {
                    updated_products: updatedProducts,
                },
            };
        }
        catch (err) {
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
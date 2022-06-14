const userRepository = require("../repositories/userRepository");

class userService {
    static async getById({ id }) {
        try {
            const getById = await userRepository.getById({
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
            const updatedPost = await userRepository.updateById({
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
                    updated_post: updatedPost,
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
}

module.exports = userService
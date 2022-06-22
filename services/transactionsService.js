const transactionsRepository = require("../repositories/transactionsRepository");

class TransactionsService {
    static async create({ user_id, product_id }) {
        try {
            if (!product_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "product id harus diisi",
                    data: {
                        data: null,
                    },
                };
            }

            const createdWishlist = await transactionsRepository.create({
                user_id,
                product_id
            });

            return {
                status: true,
                status_code: 201,
                message: "whistlist added successfully",
                data: {
                    created_wishlist: createdWishlist,
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

    static async getWishlistByUserId({ id, sold }) {
        try {
            const getWishlist = await transactionsRepository.getWishlistByUserId({
                id,
                sold
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    data: getWishlist,
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

module.exports = TransactionsService;
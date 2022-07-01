const transactionsRepository = require("../repositories/transactionsRepository");

class transactionsService {
    static async create({ user_id, seller_id, product_id, bargain_price, accepted, rejected }) {
        try {
            if (!seller_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Seller id harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }
            
            if (!product_id) {
                return {
                    status: false,
                    status_code: 400,
                    message: "product id harus diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            const createdTransaction = await transactionsRepository.create({
                user_id,
                seller_id,
                product_id,
                bargain_price,
                accepted,
                rejected
            });

            return {
                status: true,
                status_code: 201,
                message: "transaction created successfully",
                data: {
                    created_transaction: createdTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

    static async updateById({ id, user_id, seller_id, product_id, bargain_price, accepted, rejected  }) {
        try {
            const getTransaction = await transactionsRepository.getTransactionById({ id });

            if (getTransaction.user_id == user_id) {
                const updatedTransaction = await transactionsRepository.updateTransactionById({
                    id,
                    user_id,
                    seller_id,
                    product_id,
                    bargain_price,
                    accepted,
                    rejected
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Transaction updated successfully",
                    data: {
                        updated_transaction: updatedTransaction,
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        updated_transaction: null,
                    },
                };
            }
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }
    
    static async getTransactionByUserId({ id, accepted, rejected }) {
        try {
            const getTransaction = await transactionsRepository.getTransactionByUserId({
                id,
                accepted,
                rejected
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    transactions: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

    static async getTransactionBySellerId({ id, accepted, rejected }) {
        try {
            const getTransaction = await transactionsRepository.getTransactionBySellerId({
                id,
                accepted,
                rejected
            });

            return {
                status: true,
                status_code: 200,
                message: "Success",
                data: {
                    transactions: getTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }

}

module.exports = transactionsService;
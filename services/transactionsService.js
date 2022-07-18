const transactionsRepository = require("../repositories/transactionsRepository");

class transactionsService {
    static async create({ user_id, seller_id, product_id, bargain_price, isRejected, isAccepted, isOpened }) {
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

            if (!isOpened) {
                return {
                    status: false,
                    status_code: 400,
                    message: "isOpened tidak ada value",
                    data: {
                        created_transaksi: null,
                    },
                };
            }


            const createdTransaction = await transactionsRepository.create({
                user_id,
                seller_id,
                product_id,
                bargain_price,
                isRejected,
                isAccepted,
                isOpened
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
        const getTransaction = await transactionsRepository.getTransactionById({
            id
        });

        if (getTransaction.user_id == user_id) {
            const updateTransaction = await transactionsRepository.updateTransaction({
                id,
                user_id,
                seller_id,
                product_id,
                bargain_price,
                isRejected,
                isAccepted,
                isOpened
            });

            return {
                status: true,
                status_code: 200,
                message: "updated Product successfully",
                data: {
                    update: updateTransaction,
                },
            };
        } else {
            return {
                status: true,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    update: null,
                },
            };
        }
    }

    static async getTransactionByUserId({ id, isRejected, isAccepted, isOpened }) {
        try {
            const getTransaction = await transactionsRepository.getTransactionByUserId({
                id,
                isRejected,
                isAccepted,
                isOpened
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

    static async getTransactionBySellerId({ id, isRejected, isAccepted, isOpened }) {
        try {
            const getTransaction = await transactionsRepository.getTransactionBySellerId({
                id,
                isRejected,
                isAccepted,
                isOpened
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
    static async getAllTransaction() {
        try {
            const getAllTransaction = await transactionRepository.getAllTransaction();

            return {
                status: true,
                status_code: 200,
                message: "Product successfully loaded",
                data: {
                    getAllTransaction: getAllTransaction,
                },
            };
        } catch (err) {
            return {
                status: false,
                code_status: 500,
                message: err.message,
                data: {
                    getAllTransaction: null,
                },
            };
        }
    }

}

module.exports = transactionsService;
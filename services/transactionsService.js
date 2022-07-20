const transactionsRepository = require("../repositories/transactionsRepository");

class transactionsService {
    static async createTransaction({
        user_id,
        seller_id,
        product_id,
        bargain_price,
        isRejected,
        isAccepted,
        isOpened
    }) {
        if (!bargain_price) {
            return {
                status: false,
                status_code: 400,
                message: "harga wajib diisi",
                data: {
                    created_transaksi: null,
                },
            };
        }

        if (!product_id) {
            return {
                status: false,
                status_code: 400,
                message: "product id tidak ditemukan",
                data: {
                    created_transaksi: null,
                },
            };
        }

        if (!seller_id) {
            return {
                status: false,
                status_code: 400,
                message: "seller id tidak ditemukan",
                data: {
                    created_transaksi: null,
                },
            };
        }

        const createTransaction = await transactionsRepository.createTransaction({
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
            message: "created transaction successfully",
            data: {
                created_transaksi: createTransaction,
            },
        };
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
            const getAllTransaction = await transactionsRepository.getAllTransaction();

            return {
                status: true,
                status_code: 200,
                message: "Transactions successfully loaded",
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
    static async getTransactionNotif({
        id,
        isAccepted,
        isRejected
    }) {
        const getTransactionNotif = await transactionsRepository.getTransactionNotif({
            id,
            isAccepted,
            isRejected
        });
        return {
            status: true,
            status_code: 200,
            message: "success get data",
            data: {
                getTransactionNotif: getTransactionNotif,
            },
        };
    }
    static async getTransactionById({
        isAccepted,
        isRejected,
        id,
    }) {
        const getTransactionById = await transactionsRepository.getTransactionById({
            isAccepted,
            isRejected,
            id,
        });
        return {
            status: true,
            status_code: 200,
            message: "success get data",
            data: {
                getTransactionById: getTransactionById,
            },
        };
    }
}

module.exports = transactionsService;
const productsRepository = require("../repositories/productsRepository");

class ProductsService {
    static async create({ user_id, name, price, category, description, picture }) {
        try {
            if (!name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Nama produk wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!price) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Harga produk wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!category) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Kategori produk wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!description) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Deskripsi produk wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }

            if (!picture) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Gambar produk wajib diisi",
                    data: {
                        registered_user: null,
                    },
                };
            }


            const createdProducts = await productsRepository.create({
                user_id,
                name,
                price,
                category,
                description,
                picture,
            });

            return {
                status: true,
                status_code: 201,
                message: "Product created successfully",
                data: {
                    created_post: createdProducts,
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

module.exports = ProductsService;
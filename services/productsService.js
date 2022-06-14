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
                    created_product: createdProducts,
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

    static async getAll() {
        try {
            const getAll = await productsRepository.getAll();

            return {
                status: true,
                status_code: 200,
                message: "Products successfully loaded",
                data: {
                    getDataAll: getAll,
                },
            };
        }
        catch (err) {
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

    static async getProductById({ id, }) {
        try {
            const getProductById = await productsRepository.getProductById({
                id,
            });
            return {
                status: true,
                status_code: 200,
                message: "success get data",
                data: {
                    getdata: getProductById,
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
    static async updateProductById({ id, user_id, name, price, category, description, picture }) {
        try {
            const getProduct = await productsRepository.getProductById({
                id
            });

            if (getProduct.user_id == user_id) {
                const updatedProduct = await productsRepository.updateProductById({
                    id,
                    name,
                    price,
                    category,
                    description,
                    picture
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Product updated successfully",
                    data: {
                        updated_product: updatedProduct,
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        updated_post: null,
                    },
                };
            }
        }
        catch (err) {
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

    static async deleteProductById({ user_id, id, }) {
        try {
            const getProduct = await productsRepository.getProductById({
                id
            });

            if (getProduct.user_id == user_id) {
                const deletedProduct = await productsRepository.deleteProductById({
                    id,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Product deleted successfully",
                    data: {
                        deleted_product: deletedProduct,
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deleted_post: null,
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
}

module.exports = ProductsService;
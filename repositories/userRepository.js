const { users } = require("../models");

class UsersRepository {
    static async getByEmail({ email }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    }

    static async getById({
        id
    }) {
        const getUser = await users.findOne({
            where: {
                id
            }
        });

        return getUser;
    }

    static async create({
        name,
        email,
        password,
    }) {
        const createdUser = users.create({
            name,
            email,
            password,
        });

        return createdUser;
    }

    static async updateById({ id, name, city, address, phoneNumber, picture }) {
        const updateById = await users.update({
            name,
            city,
            address,
            phoneNumber,
            picture,
        }, {
            where: {
                id
            }
        });

        return updateById;
    }
}

module.exports = UsersRepository;
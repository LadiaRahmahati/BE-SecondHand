'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    picture: DataTypes.ARRAY(DataTypes.STRING),
    isPublish: DataTypes.BOOLEAN,
    sold: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};
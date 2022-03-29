'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transactions.init({
    tanggal: DataTypes.DATE,
    namaBarang: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};
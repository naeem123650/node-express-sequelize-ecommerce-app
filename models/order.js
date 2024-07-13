"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.hasMany(models.OrderItem, { foreignKey: "order_id" });
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      total: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["inProgress", "dispatched", "delivered"],
        defaultValue: "inProgress",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    }
  );
  return Order;
};

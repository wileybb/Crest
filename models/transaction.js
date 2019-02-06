
module.exports = function (sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
      userIdTransaction: {
        type: DataTypes.INTEGER
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      purchasePrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

       buy: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
      },

      purchaseTotal: {
          type: DataTypes.FLOAT,  
      }

    });
  
    Transaction.associate = function (models) {
      // Associating Transaction with Users
      Transaction.belongsTo(models.User, {
        foreignKey: {
          allowNull: true
        }
      });

    };
  
    return Transaction;
  };
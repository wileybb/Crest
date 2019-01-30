
module.exports = function (sequelize, DataTypes) {
    var Portfolio = sequelize.define("Portfolio", {

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
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      cash: {
          type: DataTypes.INTEGER,
          defaultValue: 100
      }

    });
  
    // Portfolio.associate = function (models) {
    //   // Associating Portfolio with Users
    //   Portfolio.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: true
    //     }
    //   });

    // };
  
    return Portfolio;
  };
  
module.exports = function (sequelize, DataTypes){
    var Stock = sequelize.define("Stock", {
        stock : {
            type: DataTypes.STRING,
            allowNull:false,
        }
    });
   
    Stock.associate = function(models){
        Stock.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        });
    }

    return Stock;
}
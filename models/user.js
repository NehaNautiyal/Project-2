module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Bet, {
      onDelete: "cascade"
    });
  };

  return User;
};
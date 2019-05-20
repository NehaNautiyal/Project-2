module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.BLOB,
      defaultValue: ""
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 1000,
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

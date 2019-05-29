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

  // FROM WILL - WE SHOULD PROBABLY LOOK AT THIS LOGIC, BECAUSE IT WOULD ALLOW USERS TO DELETE IN PROGRESS BETS RIGHT BEFORE LOSING THEN CREATE A NEW USER
  // PROBABLY THIS MEANS PROGRAMMING IN LOGIC THAT EVERY ACTIVE BET IS AUTOMATICALLY AWARDED TO OTHER USER
  User.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Bet, {
      onDelete: "cascade"
    });
  };

  return User;
};

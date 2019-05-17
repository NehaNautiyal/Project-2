module.exports = function(sequelize, DataTypes) {
  var Bet = sequelize.define("Bet", {
    challenger: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    amount: {
      type: DataTypes.INTEGER,
      required: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      defaultValue: "Personal"
    }
  });

  Bet.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Bet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bet;
};

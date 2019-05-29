module.exports = function(sequelize, DataTypes) {
  var Bet = sequelize.define("Bet", {
    initiator: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    challengee: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    // parties: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1, 100]
    //   }
    // },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 510]
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 140]
    },
    amount: {
      type: DataTypes.INTEGER,
      required: false
    },
    juice: {
      type: DataTypes.INTEGER,
      required: false
    },
    category: {
      type: DataTypes.TEXT,
      defaultValue: "Personal"
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    offerExpireDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // createDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    acceptFlag: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    },
    activeBetFlag: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: true 
    },
    initiatorVote: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    challengeeVote: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    disagreementFlag: { 
      type: DataTypes.BOOLEAN, 
      // allowNull: false, 
      // defaultValue: true
    },
    mediatorVote: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    emailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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

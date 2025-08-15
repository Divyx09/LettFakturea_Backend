module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    button: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opt1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opt2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opt3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opt4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    opt5: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'Terms',
    timestamps: false,
  });

  return Term;
};

const pin = (sequelize, DataTypes) => {
  const Pin = sequelize.define('pin', {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
  });

  Pin.associate = models => {
    Pin.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return Pin;
}

export default pin;

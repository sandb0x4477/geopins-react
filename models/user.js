const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //     len: [6, 100],
    //   },
    // },
  });

  // User.associate = models => {
  //   User.hasMany(models.Post, { foreignKey: 'userId' });
  //   // Post.belongsTo(models.Topic, { foreignKey: 'topicId', onDelete: 'CASCADE' });
  //   // Post.belongsTo(models.Forum, { through: models.Topic, onDelete: 'CASCADE' });
  // };

  return User;
}

export default user;

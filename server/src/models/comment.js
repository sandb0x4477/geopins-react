const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.STRING,
    },
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Pin, { foreignKey: 'pinId', onDelete: 'CASCADE' });
    Comment.belongsTo(models.User, { through: models.Pin, onDelete: 'CASCADE' });
  };

  return Comment;
}

export default comment;

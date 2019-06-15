import Sequelize from 'sequelize';

const Op = Sequelize.Op

const sequelize = new Sequelize(
  process.env.DATASBASE,
  process.env.DATASBASE_USER,
  process.env.DATASBASE_PASSWORD,
  {
    dialect: 'postgres',
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    },
    sync: { force: false }
  }
);

const models = {
  Comment: sequelize.import('./comment'),
  Pin: sequelize.import('./pin'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key])
  {
    models[key].associate(models);
  }
});


export { sequelize };

export default models;

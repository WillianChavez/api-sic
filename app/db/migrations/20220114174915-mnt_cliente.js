const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_cliente', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: psql.Sequelize.STRING(255),
        allowNull: false,
      },
      dui: {
        type: psql.Sequelize.STRING(10),
        allowNull: false,
      },
      email: {
        type: psql.Sequelize.STRING(255),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_cliente');
  },
};

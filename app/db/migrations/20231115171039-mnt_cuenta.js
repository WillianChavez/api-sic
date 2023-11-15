const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_cuenta', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_cuenta: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_cuenta',
          key: 'id',
        },
      },
      nombre: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      codigo: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_cuenta');
  },
};

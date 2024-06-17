const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_venta', {
      numero_factura: {
        type: psql.Sequelize.STRING(20),
        primaryKey: true,
        defaultValue: psql.Sequelize.fn('uuid_generate_v4'),
      },
      id_cliente: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_venta');
  },
};

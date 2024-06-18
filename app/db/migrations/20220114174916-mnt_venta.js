const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_venta', {
      numero_factura: {
        type: psql.Sequelize.UUID,
        primaryKey: true,
        defaultValue: psql.Sequelize.UUIDV4,
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

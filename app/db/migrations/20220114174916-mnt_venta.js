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
        allowNull: true,
      },
      fecha: {
        type: psql.Sequelize.DATE,
        allowNull: false,
        defaultValue: psql.Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_venta');
  },
};

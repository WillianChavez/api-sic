const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_detalle_venta', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_pago: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
      id_venta: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      total: {
        type: psql.Sequelize.DECIMAL,
        allowNull: false,
      },
      cantidad_servicios: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_detalle_venta');
  },
};

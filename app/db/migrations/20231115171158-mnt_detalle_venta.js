const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_detalle_venta', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_servicio: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_servicio',
          key: 'id',
        },
      },
      numero_factura: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      gravado_local: {
        type: psql.Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_detalle_venta');
  },
};

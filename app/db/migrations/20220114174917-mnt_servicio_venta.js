const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_servicio_venta', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_venta: {
        type: psql.Sequelize.UUID,
        allowNull: false,
      },
      id_servicio: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_defuncion: {
        type: psql.Sequelize.DATE,
        allowNull: true,
      },
      cantidad: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: psql.Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_servicio_venta');
  },
};

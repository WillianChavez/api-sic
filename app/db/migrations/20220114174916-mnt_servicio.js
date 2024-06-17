const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_servicio', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_servicio: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      fecha: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      descripcion: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      precio_base: {
        type: psql.Sequelize.DECIMAL,
        allowNull: false,
      },
      costo: {
        type: psql.Sequelize.DECIMAL,
        allowNull: false,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_servicio');
  },
};

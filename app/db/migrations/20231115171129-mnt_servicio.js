const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_servicio', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipo_contribuyente: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_contribuyente',
          key: 'id',
        },
      },
      id_cuenta: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_cuenta',
          key: 'id',
        },
      },
      id_tipo_emision_documento: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_emision_documento',
          key: 'id',
        },
      },
      fecha: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      cliente: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      descripcion: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      nit: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      nrc: {
        type: psql.Sequelize.STRING(20),
        allowNull: true,
      },

    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_servicio');
  },
};

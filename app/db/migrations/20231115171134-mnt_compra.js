const psql = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('mnt_compra', {
      id: {
        type: psql.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cuenta: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mnt_cuenta',
          key: 'id',
        },
      },
      id_tipo_contribuyente: {
        type: psql.Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ctl_tipo_contribuyente',
          key: 'id',
        },
      },
      fecha_emision: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      fecha_contable: {
        type: psql.Sequelize.DATE,
        allowNull: false,
      },
      descripcion: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      numero_documento_ccf: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      nit: {
        type: psql.Sequelize.STRING(20),
        allowNull: false,
      },
      proveedor: {
        type: psql.Sequelize.STRING(250),
        allowNull: false,
      },
      nrc: {
        type: psql.Sequelize.STRING(20),
        allowNull: true,
      },
      es_sujeto_excluido: {
        type: psql.Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('mnt_compra');
  },
};

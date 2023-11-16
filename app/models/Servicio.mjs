import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Cuenta, TipoContribuyente, TipoEmisionDocumento } from './index.mjs';

class Servicio extends psql.Model {
  static associate() {
    this.belongsTo(TipoContribuyente, {
      foreignKey: 'id_tipo_contribuyente',
    });
    this.belongsTo(TipoEmisionDocumento, {
      foreignKey: 'id_tipo_emision_documento',
    });
    this.belongsTo(Cuenta, {
      foreignKey: 'id_cuenta',
    });
  }
}

Servicio.init(
  // eslint-disable-next-line linebreak-style
  {
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
    id_Servicio: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_Servicio',
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

  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_servicio',
  },
);

export default Servicio;

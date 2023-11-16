import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import {
  Cuenta, DetalleCompra, Persona, TipoContribuyente,
} from './index.mjs';

class Compra extends psql.Model {
  static associate() {
    this.belongsTo(TipoContribuyente, {
      foreignKey: 'id_tipo_contribuyente',
    });
    this.belongsTo(Cuenta, {
      foreignKey: 'id_cuenta',
    });
    this.hasOne(DetalleCompra, {
      foreignKey: 'id_compra',
      hooks: true,
      onDelete: 'CASCADE',
    });
    this.belongsTo(Persona, {
      foreignKey: 'id_proveedor',
    });
  }
}

Compra.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_compra: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_Compra',
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
    id_proveedor: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'mnt_persona',
        key: 'id',
      },
    },
    es_sujeto_excluido: {
      type: psql.Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_compra',
  },
);

export default Compra;

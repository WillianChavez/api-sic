import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { DetalleVenta } from './index.mjs';

class TipoPago extends psql.Model {
  static associate() {
    this.hasMany(DetalleVenta, {
      foreignKey: 'id_tipo_pago',
    });
  }
}

TipoPago.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'ctl_tipo_pago',
  },
);

export default TipoPago;

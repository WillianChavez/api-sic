import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { TipoPago, Venta } from './index.mjs';

class DetalleVenta extends psql.Model {
  static associate() {
    this.belongsTo(TipoPago, {
      foreignKey: 'id_tipo_pago',
    });
    this.belongsTo(Venta, {
      foreignKey: 'id_venta',
    });
  }
}

DetalleVenta.init(
  {
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
      type: psql.Sequelize.VARCHAR(20),
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
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_detalle_venta',
  },
);

export default DetalleVenta;

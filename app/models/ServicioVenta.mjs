import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Venta, Servicio } from './index.mjs';

class ServicioVenta extends psql.Model {
  static associate() {
    this.belongsTo(Venta, {
      foreignKey: 'id_venta',
    });
    this.belongsTo(Servicio, {
      foreignKey: 'id_servicio',
    });
  }
}

ServicioVenta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: psql.Sequelize.STRING(20),
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
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_servicio_venta',
  },
);

export default ServicioVenta;

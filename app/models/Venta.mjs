import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Cliente, Servicio } from './index.mjs';
import ServicioVenta from './ServicioVenta.mjs';

class Venta extends psql.Model {
  static associate() {
    this.belongsTo(Cliente, {
      foreignKey: 'id_cliente',
    });
    this.hasMany(ServicioVenta, {
      foreignKey: 'id_venta',
    });
    this.belongsToMany(Servicio, {
      through: ServicioVenta,
      foreignKey: 'id_venta',
    });
  }
}

Venta.init(
  {
    numero_factura: {
      type: psql.Sequelize.UUID,
      primaryKey: true,
      defaultValue: psql.Sequelize.UUIDV4,
    },
    id_cliente: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_venta',
  },
);

export default Venta;

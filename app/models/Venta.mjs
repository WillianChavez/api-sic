import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Cliente } from './index.mjs';

class Venta extends psql.Model {
  static associate() {
    this.belongsTo(Cliente, {
      foreignKey: 'id_cliente',
    });
  }
}

Venta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

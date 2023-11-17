import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { Compra, Servicio, TransaccionCuenta } from './index.mjs';

class Transaccion extends psql.Model {
  static associate() {
    this.hasOne(Servicio, {
      foreignKey: 'id_transaccion',
      hooks: true,
      onDelete: 'CASCADE',
    });

    this.hasOne(Compra, {
      foreignKey: 'id_transaccion',
      hooks: true,
      onDelete: 'CASCADE',
    });

    this.hasMany(TransaccionCuenta, {
      foreignKey: 'id_transaccion',
      hooks: true,
      onDelete: 'CASCADE',
    });
  }
}

Transaccion.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_transaccion',
  },
);

export default Transaccion;

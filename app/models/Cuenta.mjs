import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import { TipoCuenta, TransaccionCuenta } from './index.mjs';

class Cuenta extends psql.Model {
  static associate() {
    this.belongsTo(TipoCuenta, {
      foreignKey: 'id_tipo_cuenta',
    });
    this.hasMany(TransaccionCuenta, {
      foreignKey: 'id_cuenta',
      hooks: true,
      onDelete: 'CASCADE',
    });
  }
}

Cuenta.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tipo_cuenta: {
      type: psql.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ctl_tipo_cuenta',
        key: 'id',
      },
    },
    nombre: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    codigo: {
      type: psql.Sequelize.STRING(20),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_cuenta',
  },
);

export default Cuenta;

import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';

class Cuenta extends psql.Model {
  static associate() {
  }
}

Cuenta.init(
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
    tableName: 'mnt_Cuenta',
  },
);

export default Cuenta;

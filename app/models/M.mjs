import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';

class Ruta extends psql.Model {
  static associate() {
  }
}

Ruta.init(
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
    tableName: 'mnt_ruta',
  },
);

export default Ruta;

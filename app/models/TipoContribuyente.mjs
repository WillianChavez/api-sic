import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';

class TipoContribuyente extends psql.Model {
  static associate() {
  }
}

TipoContribuyente.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'ctl_tipo_contribuyente',
  },
);

export default TipoContribuyente;

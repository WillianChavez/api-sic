import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import {
} from './index.mjs';

class Servicio extends psql.Model {
  static associate() {

  }
}

Servicio.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    fecha: {
      type: psql.Sequelize.DATE,
      allowNull: false,
    },
    descripcion: {
      type: psql.Sequelize.STRING(250),
      allowNull: false,
    },
    precio_base: {
      type: psql.Sequelize.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_servicio',
  },
);

export default Servicio;

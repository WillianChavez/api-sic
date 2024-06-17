/* eslint-disable import/no-cycle */
import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import Servicio from './Servicio.mjs';

class TipoServicio extends psql.Model {
  static associate() {
    this.hasMany(Servicio, {
      foreignKey: 'id_tipo_servicio',
    });
  }
}

TipoServicio.init({
  id: {
    type: psql.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: psql.Sequelize.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,
  sequelize: DB.connection(),
  tableName: 'ctl_tipo_servicio',
});

export default TipoServicio;

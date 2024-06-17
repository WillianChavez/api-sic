import psql from 'sequelize';
import DB from '../nucleo/DB.mjs';
import Venta from './Venta.mjs';

class Cliente extends psql.Model {
  static associate() {
    this.hasMany(Venta, {
      foreignKey: 'id_cliente',
    });
  }
}

Cliente.init(
  {
    id: {
      type: psql.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: psql.Sequelize.STRING(255),
      allowNull: false,
    },
    dui: {
      type: psql.Sequelize.STRING(10),
      allowNull: false,
    },
    email: {
      type: psql.Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_cliente',
  },
);

export default Cliente;

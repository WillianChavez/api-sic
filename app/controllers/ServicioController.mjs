import {
  Servicio,
  TipoServicio,
} from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DB from '../nucleo/DB.mjs';
import VerifyModel from '../utils/VerifyModel.mjs';

export default class ServicioController {
  static async index(req, res) {
    const servicios = await Servicio.findAll({
      include: [{
        model: TipoServicio,
      }],
    });
    return res.status(HttpCode.HTTP_OK).json(servicios);
  }

  static async listTipoServicio(req, res) {
    const tipoServicios = await TipoServicio.findAll({});
    return res.status(HttpCode.HTTP_OK).json(tipoServicios);
  }

  static async create(req, res) {
    const {
      nombre, descripcion, precio_base: precioBase, costo, id_tipo_servicio: idTipoServicio,

    } = req.body;
    const t = await DB.connection().transaction();
    try {
      await VerifyModel.exist(TipoServicio, idTipoServicio, 'Tipo de servicio no encontrado');
      const newServicio = await Servicio.create(
        {
          nombre,
          descripcion,
          precio_base: precioBase,
          costo,
          id_tipo_servicio: idTipoServicio,
          fecha: new Date(),
        },
        { transaction: t },
      );

      await t.commit();

      return res.status(HttpCode.HTTP_OK).json(newServicio);
    } catch (error) {
      t.rollback();
      throw error;
    }
  }

  static async show(req, res) {
    const servicio = await Servicio.findByPk(req.params.id, {
    });

    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async update(req, res) {
    const {
      nombre, descripcion, precio_base: precioBase, costo, id_tipo_servicio: idTipoServicio,

    } = req.body;
    const t = await DB.connection().transaction();
    try {
      await VerifyModel.exist(TipoServicio, idTipoServicio, 'Tipo de servicio no encontrado');
      const newServicio = await Servicio.update(
        {
          nombre,
          descripcion,
          precio_base: precioBase,
          costo,
          id_tipo_servicio: idTipoServicio,
          fecha: new Date(),
        },
        {
          where: { id: req.params.id },
          transaction: t,
        },
      );

      await t.commit();

      return res.status(HttpCode.HTTP_OK).json(newServicio);
    } catch (error) {
      t.rollback();
      throw error;
    }
  }

  static async getById(req, res) {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: [{
        model: TipoServicio,
      }],
    });
    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async destroy(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);
    await servicio.destroy();
    return res.status(HttpCode.HTTP_OK).json(servicio);
  }
}

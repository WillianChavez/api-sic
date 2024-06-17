import {
  Servicio,
} from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DB from '../nucleo/DB.mjs';

export default class ServicioController {
  static async index(req, res) {
    const servicios = await Servicio.findAll({
    });
    return res.status(HttpCode.HTTP_OK).json(servicios);
  }

  static async create(req, res) {
    const {
      servicio,
    } = req.body;
    const t = await DB.connection().transaction();
    try {
      const newServicio = await Servicio.create(
        { ...servicio },
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
    // const servicio = await Servicio.findByPk(req.params.id);

    // const { detalleVenta, ...newServicio } = req.body;
    // await Servicio.update(newServicio, { where: { id: req.params.id } });
    // await DetalleVenta.update(detalleVenta, {
    //   where: { id: servicio.id_detalle_venta },
    // });

    return res.status(HttpCode.HTTP_OK).json('servicio');
  }

  static async destroy(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);
    await servicio.destroy();
    return res.status(HttpCode.HTTP_OK).json(servicio);
  }
}

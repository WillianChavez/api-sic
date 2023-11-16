import { Servicio, DetalleVenta } from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';

export default class ServicioController {
  static async index(req, res) {
    const servicios = await Servicio.findAll({
      include: [
        {
          model: DetalleVenta,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(servicios);
  }

  static async create(req, res) {
    const { detalleVenta, ...newServicio } = req.body;
    const servicio = await Servicio.create(newServicio);
    const detalle = await DetalleVenta.create({
      ...detalleVenta,
      id_servicio: servicio.id,
    });
    return res.status(HttpCode.HTTP_CREATED).json({ servicio, detalle });
  }

  static async show(req, res) {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: [
        {
          model: DetalleVenta,
        },
      ],
    });

    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async update(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);

    const { detalleVenta, ...newServicio } = req.body;
    await Servicio.update(newServicio, { where: { id: req.params.id } });
    await DetalleVenta.update(detalleVenta, {
      where: { id: servicio.id_detalle_venta },
    });

    return res.status(HttpCode.HTTP_OK).json(servicio);
  }

  static async destroy(req, res) {
    const servicio = await Servicio.findByPk(req.params.id);
    await servicio.destroy();
    return res.status(HttpCode.HTTP_OK).json(servicio);
  }
}

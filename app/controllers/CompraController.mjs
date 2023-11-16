import { Compra, DetalleCompra } from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';

export default class CompraController {
  static async index(req, res) {
    const compras = await Compra.findAll({
      include: [
        {
          model: DetalleCompra,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(compras);
  }

  static async create(req, res) {
    const { detalleCompra, ...newcompra } = req.body;
    const compra = await Compra.create(newcompra);
    const detalle = await DetalleCompra.create({
      ...detalleCompra,
      id_compra: compra.id,
    });
    return res.status(HttpCode.HTTP_CREATED).json({ compra, detalle });
  }

  static async show(req, res) {
    const compra = await Compra.findByPk(req.params.id, {
      include: [
        {
          model: DetalleCompra,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(compra);
  }

  static async update(req, res) {
    const compra = await Compra.findByPk(req.params.id);

    const { detalleCompra, ...newcompra } = req.body;
    await Compra.update(newcompra, { where: { id: req.params.id } });

    await DetalleCompra.update(detalleCompra, {
      where: { id: compra.id_detalle_compra },
    });

    return res.status(HttpCode.HTTP_OK).json(compra);
  }

  static async destroy(req, res) {
    const compra = await Compra.findByPk(req.params.id);
    await compra.destroy();
    return res.status(HttpCode.HTTP_OK).json(compra);
  }
}

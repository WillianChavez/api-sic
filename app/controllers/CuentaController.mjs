import { Cuenta } from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';

export default class CuentaController {
  static async index(req, res) {
    const cuentas = await Cuenta.findAll();
    return res.status(HttpCode.HTTP_OK).json(cuentas);
  }

  static async create(req, res) {
    const cuenta = await Cuenta.create(req.body);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async show(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async update(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    await cuenta.update(req.body);
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }

  static async destroy(req, res) {
    const cuenta = await Cuenta.findByPk(req.params.id);
    await cuenta.destroy();
    return res.status(HttpCode.HTTP_OK).json(cuenta);
  }
}

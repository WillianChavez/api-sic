import { TipoContribuyente, TipoCuenta, TipoEmisionDocumento } from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';

export default class CatalogoController {
  static async getTipoContribuyentes(req, res) {
    const tipoContribuyentes = await TipoContribuyente.findAll();
    return res.status(HttpCode.HTTP_OK).json(tipoContribuyentes);
  }

  static async getTipoCuentas(req, res) {
    const tipoCuentas = await TipoCuenta.findAll();
    return res.status(HttpCode.HTTP_OK).json(tipoCuentas);
  }

  static async getTipoEmisionDocumentos(req, res) {
    const tipoEmisionDocumentos = await TipoEmisionDocumento.findAll();
    return res.status(HttpCode.HTTP_OK).json(tipoEmisionDocumentos);
  }
}

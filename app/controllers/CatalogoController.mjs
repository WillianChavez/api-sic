import {
  Persona,
} from '../models/index.mjs';
import HttpCode from '../../configs/httpCode.mjs';

export default class CatalogoController {
  static async verifyPersona(req, res) {
    const { nit } = req.params;

    const persona = await Persona.findOne({
      where: {
        nit,
      },
    });

    if (persona) {
      return res.status(HttpCode.HTTP_OK).json(persona);
    }

    return res.status(HttpCode.HTTP_OK).json();
  }
}

import { Cliente } from '../models/index.mjs';

export default class ClienteController {
  static async list(req, res) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  }

  static async create(req, res) {
    const { nombre, dui, email } = req.body;
    const cliente = await Cliente.create({
      nombre,
      dui,
      email,
    });
    res.json(cliente);
  }

  static async show(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);
    res.json(cliente);
  }
}

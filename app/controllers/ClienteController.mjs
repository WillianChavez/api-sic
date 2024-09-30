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

  static async update(req, res) {
    const { nombre, dui, email } = req.body;
    const cliente = await Cliente.findByPk(req.params.id);
    cliente.nombre = nombre;
    cliente.dui = dui;
    cliente.email = email;
    await cliente.save();
    res.json(cliente);
  }

  static async delete(req, res) {
    const {id} = req.params;
    const cliente = await Cliente.findByPk(id);
    await cliente.destroy();
  }
}

import { Op } from 'sequelize';
import Venta from '../models/Venta.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DetalleVenta from '../models/DetalleVenta.mjs';
import ServicioVenta from '../models/ServicioVenta.mjs';
import DB from '../nucleo/DB.mjs';
import Servicio from '../models/Servicio.mjs';
import Cliente from '../models/Cliente.mjs';

const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export default class VentaController {
  static async index(req, res) {
    const ventas = await Venta.findAll({
      include: [
        {
          model: DetalleVenta,
        },
        {
          model: Cliente,
        },
      ],
    });
    return res.status(HttpCode.HTTP_OK).json(ventas);
  }

  static async create(req, res) {
    const { id_cliente: idCliente, detalle, servicios } = req.body;

    const idEmpleado = req.usuario.id;

    const t = await DB.connection().transaction();
    try {
      const newVenta = await Venta.create(
        {
          id_cliente: idCliente,
          id_empleado: idEmpleado,
          fecha: new Date(),
        },
        { transaction: t },
      );

      await DetalleVenta.create(
        {
          id_tipo_pago: 1,
          id_venta: newVenta.numero_factura,
          total: detalle.total,
          cantidad_servicios: detalle.cantidad_servicios,
          cambio: detalle.cambio,
          cantidad_pagada: detalle.cantidad_pagada,
        },
        { transaction: t },
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const servicio of servicios) {
        // eslint-disable-next-line no-await-in-loop
        await ServicioVenta.create(
          {
            id_venta: newVenta.numero_factura,
            id_servicio: servicio.id_servicio,
            cantidad: servicio.cantidad,
            subtotal: servicio.subtotal,
          },
          { transaction: t },
        );
      }

      await t.commit();

      return res.status(HttpCode.HTTP_OK).json(newVenta);
    } catch (error) {
      t.rollback();
      throw error;
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    const venta = await Venta.findByPk(id, {
      include: [
        {
          model: DetalleVenta,
        },
        {
          model: ServicioVenta,
          include: [{ model: Servicio }],
        },
      ],
    });

    if (!venta) {
      return res.status(HttpCode.HTTP_NOT_FOUND).json({ message: 'Venta no encontrada' });
    }

    return res.status(HttpCode.HTTP_OK).json(venta);
  }

  // reporte: servicios mas solicitados y ventas mensuales por año, dividido por mes, si el año no se envía, se toma el actual
  static async reporte(req, res) {
    const { anio } = req.query;
    const ventas = await Venta.findAll({
      where: {
        fecha: {
          [Op.gte]: new Date(`${anio || new Date().getFullYear()}-01-01`),
          [Op.lte]: new Date(`${anio || new Date().getFullYear()}-12-31`),
        },
      },
      include: [
        {
          model: ServicioVenta,
          include: [{ model: Servicio }],
        },
      ],
    });

    const servicios = {};
    const ventasMensuales = {};

    ventas.forEach((venta) => {
      venta.ServicioVenta.forEach((servicioVenta) => {
        const { cantidad } = servicioVenta;
        const { nombre } = servicioVenta.Servicio;

        if (!servicios[nombre]) {
          servicios[nombre] = 0;
        }
        servicios[nombre] += cantidad;
      });

      const mes = meses[new Date(venta.fecha).getMonth()];
      if (!ventasMensuales[mes]) {
        ventasMensuales[mes] = 0;
      }
      ventasMensuales[mes] += 1;
    });

    return res.status(HttpCode.HTTP_OK).json({ servicios, ventasMensuales });
  }
}

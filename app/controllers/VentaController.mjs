import { Op } from 'sequelize';
import Venta from '../models/Venta.mjs';
import HttpCode from '../../configs/httpCode.mjs';
import DetalleVenta from '../models/DetalleVenta.mjs';
import ServicioVenta from '../models/ServicioVenta.mjs';
import DB from '../nucleo/DB.mjs';
import Servicio from '../models/Servicio.mjs';
import Cliente from '../models/Cliente.mjs';
import Mailer from '../services/mailer.mjs';

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

      const findServicios = await Servicio.findAll({
        where: {
          id: {
            [Op.in]: servicios.map((servicio) => servicio.id_servicio),
          },
        },
      });

      if (idCliente) {
        const cliente = await Cliente.findByPk(idCliente);
        const recipient = cliente.email;

        const header = `
    <h2 style="text-align: center; color: #4CAF50;">Factura de Compra</h2>
    <p style="text-align: center;">Gracias por su preferencia, ${cliente.nombre}.</p>
  `;

        const serviciosTable = `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">#</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Servicio</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">Cantidad</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${servicios
    .map(
      (servicio, index) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${index + 1}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${findServicios.find((s) => s.id === servicio.id_servicio)?.nombre}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${servicio.cantidad}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${servicio.subtotal.toFixed(2)}</td>
          </tr>
        `,
    )
    .join('')}
      </tbody>
    </table>
  `;

        const totalSection = `
    <p style="text-align: right; font-weight: bold; margin: 20px 0;">
      Total: <span style="color: #4CAF50;">$${detalle.total.toFixed(2)}</span>
    </p>
  `;

        const footer = `
    <p style="text-align: center; font-size: 12px; color: #888;">
      Si tiene alguna pregunta sobre esta factura, no dude en contactarnos.
    </p>
  `;

        const htmlMessage = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
      ${header}
      ${serviciosTable}
      ${totalSection}
      ${footer}
    </div>
  `;

        await Mailer.sendMail({
          email: recipient,
          subject: 'Gracias por su compra',
          message: htmlMessage,
          header: [],
          body: [],
        });
      }

      await t.commit();

      return res.status(HttpCode.HTTP_OK).json(newVenta);
    } catch (error) {
      t.rollback();
      console.error(error);
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

const bcrypt = require('bcryptjs');
const Speakeasy = require('speakeasy');

module.exports = {
  up: async (queryInterface) => {
    const TRANSACTION = await queryInterface.sequelize.transaction();

    try {
      const salt = bcrypt.genSaltSync();

      const [PROFILE, EMPLEADO] = await queryInterface.bulkInsert(
        'mnt_perfil',
        [
          {
            nombre: 'ADMINISTRADOR',
          },
          {
            nombre: 'EMPLEADO',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const METODOAUTENTICACION = await queryInterface.bulkInsert(
        'mnt_metodo_autenticacion',
        [
          {
            nombre: 'Correo Electrónico',
            descripcion: 'Envío de codigo de seguridad por correo electrónico',
            icono: 'mdi-email',
          },
          {
            nombre: 'Código QR',
            descripcion: 'Creacion de código mediante Autenticador de Google',
            icono: 'mdi-qrcode',
          },
        ],
        { returning: ['id'], transaction: TRANSACTION },
      );
      const passwordCrypt = bcrypt.hashSync(process.env.PASSWORD_INICIAL, salt);

      const [USUARIO, USUARIO_DOS] = await queryInterface.bulkInsert(
        'mnt_usuario',
        [
          {
            email: process.env.EMAIL_INICIAL,
            password: passwordCrypt,
            is_suspended: false,
            two_factor_status: process.env.TWO_FACTOR_AUTH === 'true',
            verified: true,
            nombre: process.env.NOMBRE_INICIAL,
          },
          {
            email: 'empleado@ues.edu.sv',
            password: passwordCrypt,
            is_suspended: false,
            two_factor_status: process.env.TWO_FACTOR_AUTH === 'true',
            verified: true,
            nombre: 'Empleado',
          },
        ],
        {
          returning: ['id', 'email'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_metodo_autenticacion_usuario',
        [
          {
            id_usuario: USUARIO.id,
            id_metodo: METODOAUTENTICACION[0].id,
            secret_key: Speakeasy.generateSecret().base32,
            is_primary: true,
            verified: true,
          },
        ],
        {
          transaction: TRANSACTION,
        },
      );

      const [backend, admin] = await queryInterface.bulkInsert(
        'ctl_tipo_rol',
        [
          { name: 'Backend', prefijo: 'ROLE_' },
          { name: 'Admin', prefijo: 'ROLE_ADMIN_' },
          { name: 'Frontend', prefijo: 'ROLE_FRONT_' },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /**
       * ROLES PARA EL BACKEND
       * */
      const ROLES = await queryInterface.bulkInsert(
        'mnt_rol',
        [
          // Roles de perfil
          { name: 'ROLE_PROFILE_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_PROFILE_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_PROFILE_UPDATE', id_tipo_rol: backend.id },
          // Roles de rol :(
          { name: 'ROLE_ROLE_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_UPDATE', id_tipo_rol: backend.id },
          { name: 'ROLE_ROLE_DELETE', id_tipo_rol: backend.id },
          // Roles de ruta
          { name: 'ROLE_PATH_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_PATH_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_PATH_UPDATE', id_tipo_rol: backend.id },
          // Roles de Usuario
          { name: 'ROLE_USER_LIST', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_CREATE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_UPDATE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_DELETE', id_tipo_rol: backend.id },
          { name: 'ROLE_USER_AUTH_METHOD_LIST', id_tipo_rol: backend.id },

          /**
           * ROLES PARA EL ADMIN
           * */
          { name: 'ROLE_ADMIN_PROFILE_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_DELETE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_UPDATE', id_tipo_rol: admin.id },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /**
       * ROLES PARA LAS RUTAS DEL ADMIN
       * */
      const ROLES_RUTAS_ADMIN = await queryInterface.bulkInsert(
        'mnt_rol',
        [
          // Roles de perfil
          { name: 'ROLE_ADMIN_PROFILE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PROFILE_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PROFILE_UPDATE', id_tipo_rol: admin.id },
          // Roles de rol :(
          { name: 'ROLE_ADMIN_ROLE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_ROLE_CREATE', id_tipo_rol: admin.id },
          // Roles de ruta
          { name: 'ROLE_ADMIN_PATH_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_PATH_UPDATE', id_tipo_rol: admin.id },
          // Roles de Usuario
          { name: 'ROLE_ADMIN_USER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_CREATE', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_USER_UPDATE', id_tipo_rol: admin.id },
          { name: 'ROLE_USER_ADMIN', id_tipo_rol: admin.id },

          // roles para ver, crear y editar los servicios
          { name: 'ROLE_ADMIN_SERVICE_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_SERVICE_FORM', id_tipo_rol: admin.id },

          { name: 'ROLE_ADMIN_SERVICE_TYPE_LIST', id_tipo_rol: admin.id },

          // roles para ver los reportes
          { name: 'ROLE_ADMIN_REPORT_LIST', id_tipo_rol: admin.id },
          // reporte de libro de ventas a contribuyentes
          { name: 'ROLE_ADMIN_REPORT_SALES_BOOK_LIST', id_tipo_rol: admin.id },
          // reporte de libro de ventas a consumidores finales
          { name: 'ROLE_ADMIN_REPORT_SALES_BOOK_CONSUMERS_LIST', id_tipo_rol: admin.id },
          // reporte de libro de compras
          { name: 'ROLE_ADMIN_REPORT_PURCHASE_BOOK_LIST', id_tipo_rol: admin.id },
          // reporte de libro de diario mayor
          { name: 'ROLE_ADMIN_REPORT_GENERAL_LEDGER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_REPORT_LEDGER_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_REPORT_LEDGER_ST', id_tipo_rol: admin.id },

          // clientes
          { name: 'ROLE_ADMIN_CLIENT_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_ADMIN_CLIENT_FORM', id_tipo_rol: admin.id },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const ROLES_DASHBOARD = await queryInterface.bulkInsert(
        'mnt_rol',
        [{ name: 'ROLE_ADMIN_DASHBOARD_VIEW', id_tipo_rol: admin.id }],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );
      const RUTA_DASHBOARD = await queryInterface.bulkInsert(
        'mnt_ruta',
        [
          {
            nombre: 'dashboard',
            uri: '/',
            nombre_uri: 'dashboard',
            mostrar: true,
            icono: 'mdi-home',
            orden: 1,
            publico: false,
            admin: true,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const RUTAS = await queryInterface.bulkInsert(
        'mnt_ruta',
        [
          {
            nombre: 'perfiles',
            uri: '/profiles',
            nombre_uri: 'profiles',
            mostrar: false,
            icono: 'mdi-account',
            orden: 2,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfiles',
            uri: '/profiles/create',
            nombre_uri: 'profilesCreate',
            mostrar: false,
            icono: 'mdi-account',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfiles',
            uri: '/profiles/edit',
            nombre_uri: 'profilesEdit',
            mostrar: false,
            icono: 'mdi-account',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'roles',
            uri: '/roles',
            nombre_uri: 'roles',
            mostrar: false,
            icono: 'mdi-account-group',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'roles',
            uri: '/roles/create',
            nombre_uri: 'rolesCreate',
            mostrar: false,
            icono: 'mdi-account-multiple-plus',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths',
            nombre_uri: 'paths',
            mostrar: false,
            icono: 'mdi-routes',
            orden: 2,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths/create',
            nombre_uri: 'pathsCreate',
            mostrar: false,
            icono: 'mdi-routes',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'rutas',
            uri: '/paths/edit',
            nombre_uri: 'pathsEdit',
            mostrar: false,
            icono: 'mdi-routes',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users',
            nombre_uri: 'users',
            mostrar: true,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users/create',
            nombre_uri: 'usersCreate',
            mostrar: false,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'usuarios',
            uri: '/users/edit',
            nombre_uri: 'usersEdit',
            mostrar: false,
            icono: 'mdi-face-man',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'perfil',
            uri: '/profile',
            nombre_uri: 'profile',
            mostrar: false,
            icono: 'mdi-account-lock',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'seguridad',
            uri: '/security',
            nombre_uri: 'security',
            mostrar: false,
            icono: null,
            orden: null,
            publico: false,
            admin: false,
          },
          // rutas para ver, crear y editar los servicios
          {
            nombre: 'servicios',
            uri: '/servicios',
            nombre_uri: 'servicios',
            mostrar: true,
            icono: 'mdi-cog',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'servicios-form',
            uri: '/servicios/form',
            nombre_uri: 'servicios-form',
            mostrar: false,
            icono: null,
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'Tipo de Servicios',
            uri: '/tipo-servicios',
            nombre_uri: 'tipo-servicios',
            mostrar: true,
            icono: 'mdi-cog',
            orden: null,
            publico: false,
            admin: true,
          },
          // rutas para ver los reportes
          {
            nombre: 'reportes',
            uri: '/reportes',
            nombre_uri: 'reportes',
            mostrar: true,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de ventas a contribuyentes
          {
            nombre: 'reportes',
            uri: '/reportes/libro-ventas-contribuyentes',
            nombre_uri: 'reportes-libro-ventas-contribuyentes',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de ventas a consumidores finales
          {
            nombre: 'reportes',
            uri: '/reportes/libro-ventas-consumidores-finales',
            nombre_uri: 'reportes-libro-ventas-consumidores-finales',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de compras
          {
            nombre: 'reportes',
            uri: '/reportes/libro-compras',
            nombre_uri: 'reportes-libro-compras',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          // reporte de libro de diario mayor
          {
            nombre: 'reportes',
            uri: '/reportes/libro-diario',
            nombre_uri: 'reportes-libro-diario',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'reportes',
            uri: '/reportes/libro-mayor',
            nombre_uri: 'reportes-libro-mayor',
            mostrar: false,
            icono: 'mdi-file-chart',
            orden: null,
            publico: false,
            admin: true,
          },

          // clientes
          {
            nombre: 'clientes',
            uri: '/clientes',
            nombre_uri: 'clientes',
            mostrar: true,
            icono: 'mdi-account-group',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'clientes-form',
            uri: '/clientes/form',
            nombre_uri: 'clientes-form',
            mostrar: false,
            icono: null,
            orden: null,
            publico: false,
            admin: true,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const ROLES_VENTAS = await queryInterface.bulkInsert(
        'mnt_rol',
        [
          { name: 'ROLE_VENTAS_LIST', id_tipo_rol: admin.id },
          { name: 'ROLE_VENTAS_CREATE', id_tipo_rol: admin.id },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const RUTAS_VENTAS = await queryInterface.bulkInsert(
        'mnt_ruta',
        [
          {
            nombre: 'ventas',
            uri: '/ventas',
            nombre_uri: 'ventas',
            mostrar: true,
            icono: 'mdi-cash-register',
            orden: null,
            publico: false,
            admin: true,
          },
          {
            nombre: 'ventas-form',
            uri: '/ventas/form',
            nombre_uri: 'ventas-form',
            mostrar: false,
            icono: null,
            orden: null,
            publico: false,
            admin: true,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      const ALL_RUTAS = RUTAS.concat(RUTAS_VENTAS, RUTA_DASHBOARD);
      const ALL_ROLES = ROLES.concat(ROLES_RUTAS_ADMIN, ROLES_VENTAS, ROLES_DASHBOARD);
      const ALL_RUTAS_ROLES = ROLES_RUTAS_ADMIN.concat(ROLES_VENTAS, ROLES_DASHBOARD);

      const ROLES_EMPLEADO = ROLES_DASHBOARD.concat(ROLES_VENTAS);

      // ASIGNAR ROLES AL PERFIL ADMIN
      await queryInterface.bulkInsert(
        'mnt_perfil_rol',
        ALL_ROLES.map((role) => ({
          id_perfil: PROFILE.id,
          id_rol: role.id,
        })),
        {
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_perfil_rol',
        ROLES_EMPLEADO.map((role) => ({
          id_perfil: EMPLEADO.id,
          id_rol: role.id,
        })),
        {
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_ruta_rol',
        ALL_RUTAS_ROLES.map((role, index) => ({
          id_ruta: ALL_RUTAS[index].id,
          id_rol: role.id,
        })),
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      /** Perfil relacionar con Usuario */
      await queryInterface.bulkInsert(
        'mnt_usuario_perfil',
        [
          {
            id_perfil: PROFILE.id,
            id_usuario: USUARIO.id,
          },
          {
            id_perfil: EMPLEADO.id,
            id_usuario: USUARIO_DOS.id,
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'ctl_tipo_pago',
        [
          {
            nombre: 'Efectivo',
          },
          {
            nombre: 'Tarjeta de crédito',
          },
          {
            nombre: 'Tarjeta de débito',
          },
          {
            nombre: 'Transferencia bancaria',
          },
          {
            nombre: 'Cheque',
          },
        ],
        {
          returning: ['id'],
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'ctl_tipo_servicio',
        [
          {
            nombre: 'Atención al cliente',
          },
          {
            nombre: 'Consultoría',
          },
          {
            nombre: 'Alquiler',
          },
          {
            nombre: 'Mantenimiento',
          },
          {
            nombre: 'Traslado',
          },
          {
            nombre: 'Servicios complementarios',
          },
          {
            nombre: 'Funerarios inmediatos',
          },
          {
            nombre: 'Post-funerarios',
          },
        ],
        {
          transaction: TRANSACTION,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_servicio',
        [
          {
            nombre: 'Atención al cliente',
            descripcion: 'Servicio de atención al cliente',
            precio_base: 20,
            costo: 15,
            id_tipo_servicio: 1,
            fecha: new Date(),
          },
          {
            nombre: 'Consultoría',
            descripcion: 'Servicio de consultoría',
            precio_base: 30,
            costo: 25,
            id_tipo_servicio: 2,
            fecha: new Date(),
          },
          {
            nombre: 'Alquiler',
            descripcion: 'Servicio de alquiler',
            precio_base: 40,
            costo: 35,
            id_tipo_servicio: 3,
            fecha: new Date(),
          },
          {
            nombre: 'Mantenimiento',
            descripcion: 'Servicio de mantenimiento',
            precio_base: 50,
            costo: 45,
            id_tipo_servicio: 4,
            fecha: new Date(),
          },
          {
            nombre: 'Traslado',
            descripcion: 'Servicio de traslado',
            precio_base: 60,
            costo: 55,
            id_tipo_servicio: 5,
            fecha: new Date(),
          },
          {
            nombre: 'Servicios complementarios',
            descripcion: 'Servicio de servicios complementarios',
            precio_base: 70,
            costo: 65,
            id_tipo_servicio: 6,
            fecha: new Date(),
          },
          {
            nombre: 'Funerarios inmediatos',
            descripcion: 'Servicio de funerarios inmediatos',
            precio_base: 80,
            costo: 75,
            id_tipo_servicio: 7,
            fecha: new Date(),
          },
          {
            nombre: 'Post-funerarios',
            descripcion: 'Servicio de post-funerarios',
            precio_base: 90,
            costo: 85,
            id_tipo_servicio: 8,
            fecha: new Date(),
          },
        ],
        {
          transaction: TRANSACTION,
        },
      );

      await TRANSACTION.commit();
    } catch (e) {
      console.log(e);
      await TRANSACTION.rollback();
    }
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Promise.all([
      queryInterface.bulkDelete('mnt_usuario_perfil', null, {}),
      queryInterface.bulkDelete('mnt_ruta_rol', null, {}),
      queryInterface.bulkDelete('mnt_perfil_rol', null, {}),
      queryInterface.bulkDelete('mnt_ruta', null, {}),
      queryInterface.bulkDelete('mnt_rol', null, {}),
      queryInterface.bulkDelete('ctl_tipo_rol', null, {}),
      queryInterface.bulkDelete('mnt_metodo_autenticacion_usuario', null, {}),
      queryInterface.bulkDelete('refresh_tokens', null, {}),
      queryInterface.bulkDelete('mnt_usuario', null, {}),
      queryInterface.bulkDelete('mnt_metodo_autenticacion', null, {}),
      queryInterface.bulkDelete('mnt_perfil', null, {}),
    ]);
  },
};

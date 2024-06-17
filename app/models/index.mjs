import Usuario from './Usuario.mjs';
import RefreshToken from './RefreshToken.mjs';
import Perfil from './Perfil.mjs';
import PerfilRol from './PerfilRol.mjs';
import Rol from './Rol.mjs';
import Ruta from './Ruta.mjs';
import RutaRol from './RutaRol.mjs';
import UsuarioPerfil from './UsuarioPerfil.mjs';
import UsuarioRol from './UsuarioRol.mjs';
import MetodoAutenticacion from './MetodoAutenticacion.mjs';
import Servicio from './Servicio.mjs';
import DetalleVenta from './DetalleVenta.mjs';
import Persona from './Persona.mjs';

Usuario.associate();
RefreshToken.associate();
Perfil.associate();
Rol.associate();
Ruta.associate();
MetodoAutenticacion.associate();
Servicio.associate();
DetalleVenta.associate();
Persona.associate();

export {
  RefreshToken,
  Usuario,
  Perfil,
  PerfilRol,
  Rol,
  Ruta,
  RutaRol,
  UsuarioPerfil,
  UsuarioRol,
  MetodoAutenticacion,
  Servicio,
  DetalleVenta,
  Persona,
};

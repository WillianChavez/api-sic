import { Router } from 'express';
import ServicioController from '../../app/controllers/ServicioController.mjs';
import Auth from '../../app/middlewares/Auth.mjs';
// import Call from '../../app/utils/Call.mjs';
// import CatalogoController from '../../app/controllers/CatalogoController.mjs';

const router = Router();

router.get('/tipo-servicio', [Auth], ServicioController.listTipoServicio);

export default router;

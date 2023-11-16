import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import CatalogoController from '../../app/controllers/CatalogoController.mjs';

const router = Router();

router.get('/tipo-contribuyentes', Call(CatalogoController.getTipoContribuyentes));
router.get('/tipo-cuentas', Call(CatalogoController.getTipoCuentas));
router.get('/tipo-emision-documentos', Call(CatalogoController.getTipoEmisionDocumentos));

export default router;

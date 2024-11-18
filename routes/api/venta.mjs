import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';

import VentaController from '../../app/controllers/VentaController.mjs';

const router = Router();

router.get('/', [], Call(VentaController.index));
router.get('/reporte', [], Call(VentaController.reporte));
router.get('/:id', [], Call(VentaController.show));
router.post('/', [], Call(VentaController.create));

export default router;

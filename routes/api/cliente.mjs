import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import ClienteController from '../../app/controllers/ClienteController.mjs';

const router = Router();

router.get('/', Call(ClienteController.list));
router.get('/:id', Call(ClienteController.show));
router.post('/', Call(ClienteController.create));

export default router;

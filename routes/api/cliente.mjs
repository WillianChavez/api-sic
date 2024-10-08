import { Router } from 'express';
import Call from '../../app/utils/Call.mjs';
import ClienteController from '../../app/controllers/ClienteController.mjs';

const router = Router();

router.get('/', Call(ClienteController.list));
router.get('/:id', Call(ClienteController.show));
router.post('/', Call(ClienteController.create));
router.put('/:id', Call(ClienteController.update));
router.delete('/:id', Call(ClienteController.delete));

export default router;

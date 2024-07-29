import { Router } from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/users.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/', authRequired, createUser);
router.get('/:id', authRequired, getUser);
router.get('/', authRequired, getAllUsers);
router.put('/:id', authRequired, updateUser);
router.delete('/:id', authRequired, deleteUser);

export default router;
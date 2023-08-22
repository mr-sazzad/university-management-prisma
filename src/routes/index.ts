import { Router } from 'express';
import userRoutes from '../users/users_routes';

const router = Router();

// user routes
router.use('/users', userRoutes);

export default router;

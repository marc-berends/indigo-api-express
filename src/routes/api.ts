import { Router, Request, Response } from 'express';
import { cityTemperatureLarger, cityTemperatures, cityTemperatureSmaller, temperatures } from '../controllers/measurements';
const router = Router();

router.get('/temperatures', temperatures);
router.get('/temperatures/:city', cityTemperatures);
router.get('/temperatures/larger/:temp', cityTemperatureLarger);
router.get('/temperatures/smaller/:temp', cityTemperatureSmaller);

export default router;
import { Router, Request, Response } from 'express';
import { cityTemperatureLarger, cityTemperatures, cityTemperatureSmaller, temperatures } from '../controllers/measurements';
const router = Router();

/**
 * @openapi
 * /api/temperatures:
 *  get:
 *   description: JSON array of every city containing name, min, max and average temperatures
 *   responses:
 *    200:
 *     description: OK
 */
router.get('/temperatures', temperatures);

/**
 * @openapi
 * /api/temperatures/{city}:
 *  get:
 *   description: JSON object containing name, min, max and average temperatures for the specified city
 *   parameters:
 *    - in: path
 *      name: city
 *      required: true
 *      description: Name of the city
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: OK
 *    404:
 *     description: City not found
 */
router.get('/temperatures/:city', cityTemperatures);

/**
 * @openapi
 * /api/temperatures/larger/{temp}:
 *  get:
 *   description: JSON array of every city with an average temperature larger than or equal to the specified value
 *   parameters:
 *    - in: path
 *      name: temp
 *      required: true
 *      description: Minimum average temperature
 *      schema:
 *       type: number
 *   responses:
 *    200:
 *     description: OK
 */
router.get('/temperatures/larger/:temp', cityTemperatureLarger);

/**
 * @openapi
 * /api/temperatures/smaller/{temp}:
 *  get:
 *   description: JSON array of every city with an average temperature smaller than or equal to the specified value
 *   parameters:
 *    - in: path
 *      name: temp
 *      required: true
 *      description: Maximum average temperature
 *      schema:
 *       type: number
 *   responses:
 *    200:
 *     description: OK
 */
router.get('/temperatures/smaller/:temp', cityTemperatureSmaller);

export default router;
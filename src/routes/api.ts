import { Router, Request, Response } from 'express';
import { cityTemperatureLarger, cityTemperatures, cityTemperatureSmaller, temperatures } from '../controllers/measurements';
import { login, verifyToken } from '../controllers/auth';
const router = Router();

/**
 * @openapi
 * components:
 *  securitySchemes:
 *   Bearer:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 */

/**
 * @openapi
 * /api/login:
 *  post:
 *   description: JWT token to access the API
 *   tags:
 *    - Authentication
 *   requestBody:
 *    description: Login credentials
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        username:
 *         type: string
 *         example: USERNAME
 *        password:
 *         type: string
 *         example: PASSWORD
 *   responses:
 *    200:
 *     description: OK
 */
router.post('/login', login);

/**
 * @openapi
 * /api/temperatures:
 *  get:
 *   description: JSON array of every city containing name, min, max and average temperatures
 *   tags:
 *    - Temperatures
 *   security:
 *    - Bearer: []
 *   responses:
 *    200:
 *     description: OK
 */
router.get('/temperatures', verifyToken, temperatures);

/**
 * @openapi
 * /api/temperatures/{city}:
 *  get:
 *   description: JSON object containing name, min, max and average temperatures for the specified city
 *   tags:
 *    - Temperatures
 *   security:
 *    - Bearer: []
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
router.get('/temperatures/:city', verifyToken, cityTemperatures);

/**
 * @openapi
 * /api/temperatures/larger/{temp}:
 *  get:
 *   description: JSON array of every city with an average temperature larger than or equal to the specified value
 *   tags:
 *    - Temperatures
 *   security:
 *    - Bearer: []
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
router.get('/temperatures/larger/:temp', verifyToken, cityTemperatureLarger);

/**
 * @openapi
 * /api/temperatures/smaller/{temp}:
 *  get:
 *   description: JSON array of every city with an average temperature smaller than or equal to the specified value
 *   tags:
 *    - Temperatures
 *   security:
 *    - Bearer: []
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
router.get('/temperatures/smaller/:temp', verifyToken, cityTemperatureSmaller);

export default router;
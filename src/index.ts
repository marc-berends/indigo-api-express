import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import api from "./routes/api";
import { loadCache } from "./cache/cache";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.use('/api', api);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
	
	loadCache();

	fs.watchFile(process.env.DATA as string, () => {
		console.log('measurements.txt has changed');
		loadCache();
	});
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Temperature API',
			version: '1.0.0',
			servers: [`http://localhost:${port}`],
		}
	},
	apis: ['src/routes/*.ts'],
})));
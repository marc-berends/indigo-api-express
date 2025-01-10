import express, { Express, Request, Response } from "express";
import api from "./routes/api";
import { loadCache } from "./cache/cache";

const app: Express = express();
const port = 3000;

app.use('/api', api);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
	loadCache();
});

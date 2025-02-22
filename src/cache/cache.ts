import fs from 'fs';
import readline from 'readline';
import City from '../models/city';
import { TemperatureCalculation } from '../models/temperatureCalculation';
import CityAverage from '../models/cityAverage';

let cache: City[] = [];

export const loadCache = async () => {
	fs.readFile(process.env.CACHE as string, (err, data) => {
		if (err) {
			console.log(`Could not read ${process.env.CACHE}`);
			updateCache();
			return;
		}

		cache = JSON.parse(data.toString()).map((c: City) => new City(c.name, c.minTemp, c.maxTemp, c.avgTemp));

		updateCache();
	});
}

const updateCache = () => {
	let calculations: {
		[key: string]: TemperatureCalculation
	} = {};
	
	const readStream = fs.createReadStream(process.env.DATA as string);

	console.log('Loading cache...');
	
	const rl = readline.createInterface({ input: readStream });

	rl.on('error', (err) => {
		console.error(`Error reading ${process.env.DATA}`, err);
	});
	
	rl.on('line', (line) => {
		const [city, temp] = line.split(';');
		const tempNum = parseFloat(temp);
		if (!city || !temp || isNaN(tempNum)) {
			return;
		}
		
		if (!calculations[city]) {
			calculations[city] = {
				minTemp: tempNum,
				maxTemp: tempNum,
				totalTemp: tempNum,
				tempCount: 1,
			}
		} else {
			calculations[city].minTemp = Math.min(calculations[city].minTemp, tempNum);
			calculations[city].maxTemp = Math.max(calculations[city].maxTemp, tempNum);
			calculations[city].totalTemp += tempNum;
			calculations[city].tempCount++;
		}
	});

	rl.on('close', () => {
		cache = Object.keys(calculations).map((city) => {
			return new City(
				city,
				calculations[city].minTemp,
				calculations[city].maxTemp,
				calculations[city].totalTemp / calculations[city].tempCount,
			);
		});

		console.log('Cache loaded');

		fs.writeFile(
			process.env.CACHE as string,
			JSON.stringify(cache),
			(err) => {
				if (err) {
					console.error(`Error writing ${process.env.CACHE}`, err);
				}
			}
		);
	});
}

export const getCache = (): City[] => {
	return cache;
}

export const getCityCache = (city: string): City | undefined => {
	return cache.find((c) => c.name === city);
}

export const getLargerCache = (temp: number): CityAverage[] => {
	return cache.filter((c) => c.avgTemp >= temp).map((c) => new CityAverage(c.name, c.avgTemp));
}

export const getSmallerCache = (temp: number): CityAverage[] => {
	return cache.filter((c) => c.avgTemp <= temp).map((c) => new CityAverage(c.name, c.avgTemp));
}
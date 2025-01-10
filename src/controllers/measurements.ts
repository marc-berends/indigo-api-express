import { RequestHandler } from 'express';
import { getCache, getCityCache, getLargerCache, getSmallerCache } from '../cache/cache';

export const temperatures: RequestHandler = async (req, res, next) => {
	res.status(200).json(getCache());
};

export const cityTemperatures: RequestHandler = async (req, res, next) => {
	const city = getCityCache(req.params.city);
	
	if (!city) {
		res.status(404).json({ message: 'City not found' });
		return;
	}

	res.status(200).json(city);
};

export const cityTemperatureLarger: RequestHandler = async (req, res, next) => {
	res.status(200).json(getLargerCache(parseFloat(req.params.temp)));
};

export const cityTemperatureSmaller: RequestHandler = async (req, res, next) => {
	res.status(200).json(getSmallerCache(parseFloat(req.params.temp)));
};
import { RequestHandler } from 'express';
import { getCache, getCityCache, getLargerCache, getSmallerCache } from '../cache/cache';

export const temperatures: RequestHandler = async (req, res, next) => {
	res.json(getCache());
};

export const cityTemperatures: RequestHandler = async (req, res, next) => {
	res.json(getCityCache(req.params.city));
};

export const cityTemperatureLarger: RequestHandler = async (req, res, next) => {
	res.json(getLargerCache(parseFloat(req.params.temp)));
};

export const cityTemperatureSmaller: RequestHandler = async (req, res, next) => {
	res.json(getSmallerCache(parseFloat(req.params.temp)));
};
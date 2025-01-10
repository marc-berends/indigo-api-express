import { RequestHandler } from 'express';

export const temperatures: RequestHandler = async (req, res, next) => {
	res.json({ message: 'temperatures' });
};

export const cityTemperatures: RequestHandler = async (req, res, next) => {
	res.json({ message: 'cityTemperatures' });
};

export const cityTemperatureLarger: RequestHandler = async (req, res, next) => {
	res.json({ message: 'cityTemperatureLarger' });
};

export const cityTemperatureSmaller: RequestHandler = async (req, res, next) => {
	res.json({ message: 'cityTemperatureSmaller' });
};
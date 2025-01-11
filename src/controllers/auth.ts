import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
	
	// fake password check
	if (req.body.password !== process.env.PASSWORD) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	res.status(200).json(jwt.sign(req.body, process.env.SECRET as string, { expiresIn: '1h' }));
};

export const verifyToken: RequestHandler = async (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]!;
	
	jwt.verify(token, process.env.SECRET as string, (err) => {
		if (err) {
			res.status(401).json({ message: 'Access denied' });
			return;
		}

		next();
	});
};
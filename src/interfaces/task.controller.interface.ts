import { NextFunction, Request, Response } from 'express';

export interface ITaskController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	getAll: (req: Request, res: Response, next: NextFunction) => void;
}

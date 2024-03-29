import { NextFunction, Request, Response } from 'express';

export interface ITaskController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	getDone: (req: Request, res: Response, next: NextFunction) => void;
	getOne: (req: Request, res: Response, next: NextFunction) => void;
	update: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
}

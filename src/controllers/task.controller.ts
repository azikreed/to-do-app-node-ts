import { inject, injectable } from 'inversify';
import { BaseController } from './base.controller';
import { ITaskController } from '../interfaces/task.controller.interface';
import { ILogger } from '../interfaces/logger.service.interface';
import { TYPES } from '../types';
import { NextFunction, Request, Response } from 'express';
import { ITaskService } from '../interfaces/task.service.interface';
import { HTTPError } from '../helpers/errors/http-error.class';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { TaskCreateDto } from '../services/dto/task.dto';
import { AuthGuard } from '../middlewares/auth.guard.middleware';
import { IUserService } from '../interfaces/user.service.interface';
import mongoose from 'mongoose';

@injectable()
export class TaskController extends BaseController implements ITaskController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.TaskService) private taskService: ITaskService,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.create,
				middlewares: [new ValidateMiddleware(TaskCreateDto), new AuthGuard()],
			},
			{
				path: '/get',
				method: 'get',
				func: this.getAll,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/update/:id',
				method: 'patch',
				func: this.update,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async create({ body, user }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.taskService.createTask({ ...body, user });
		if (!result) {
			return next(new HTTPError(422, 'Что-то пошло не так!', 'create'));
		}
		this.ok(res, { ...result });
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.taskService.getAll(req.user);
		if (!result) {
			return next(new HTTPError(422, 'Что-то пошло не так!', 'create'));
		}
		this.ok(res, result);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { id } = req.params;
		try {
			const objectId = new mongoose.Types.ObjectId(id);
			const update = { ...req.body, updatedAt: new Date() };
			const result = await this.taskService.updateTask(objectId, update);
			if (!result) {
				return next(new HTTPError(422, 'Что-то пошло не так!', 'update'));
			}
			this.ok(res, result);
		} catch (e) {
			this.send(res, 400, 'Invalid request');
			this.loggerService.error(
				'[UpdateTask] проблема при конвертации id на objectId, проверьте наличие object id в req.params',
			);
		}
	}
}

import { inject, injectable } from 'inversify';
import { IUserController } from '../interfaces/user.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.service.interface';
import { IConfigService } from '../interfaces/config.interface';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(logger);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [],
			},
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		// const result = await this.userService
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		// id
	}
}

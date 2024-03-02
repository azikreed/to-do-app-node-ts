import { inject, injectable } from 'inversify';
import { IUserController } from '../interfaces/user.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.service.interface';
import { IConfigService } from '../interfaces/config.interface';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/user.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
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

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		// const result = await this.userService
	}

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		// id
	}
}

import { inject, injectable } from 'inversify';
import { IUserController } from '../interfaces/user.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.service.interface';
import { IConfigService } from '../interfaces/config.interface';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/user.service.interface';
import { HTTPError } from '../helpers/errors/http-error.class';

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

	async register({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'));
		}
		this.ok(res, { id: result._id, email: result.email, name: result.name });
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		// const result = await this.userService
	}
}

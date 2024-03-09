import { inject, injectable } from 'inversify';
import { IUserController } from '../interfaces/user.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.service.interface';
import { IConfigService } from '../interfaces/config.interface';
import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/user.service.interface';
import { HTTPError } from '../helpers/errors/http-error.class';
import { sign } from 'jsonwebtoken';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { UserRegisterDto } from '../services/dto/user-register.dto';
import { UserLoginDto } from '../services/dto/user-login.dto';
import { AuthGuard } from '../middlewares/auth.guard.middleware';

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
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
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
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const token = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		this.ok(res, { token: token });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { id: userInfo?._id, email: userInfo?.email, name: userInfo?.name });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}

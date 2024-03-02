import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './interfaces/logger.service.interface';
import { json } from 'body-parser';
import { IExceptionFilter } from './interfaces/exception.filter.interface';
import 'reflect-metadata';
import { IConfigService } from './interfaces/config.interface';
import { MongoService } from './services/db.service';
@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.MongoService) private mongoService: MongoService,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		// this.app.use('/users', this.userController)
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}

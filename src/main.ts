import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './helpers/logger/logger.interface';
import { json } from 'body-parser';
import { IExceptionFilter } from './helpers/errors/exception.filter.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
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
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started on http://localhost:${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}

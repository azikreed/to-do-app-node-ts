import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { ILogger } from '../interfaces/logger.service.interface';
import { TYPES } from '../types';
import { MongoClient } from 'mongodb';
import { IConfigService } from '../interfaces/config.interface';

@injectable()
export class MongoService {
	client: MongoClient;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.client = new MongoClient(this.configService.get('MONGO_URI'));
	}

	async connect(): Promise<void> {
		try {
			await this.client.connect();
			this.logger.log('[MongoService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[MongoService] Ошибка подключения к базе данных: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.close();
	}
}

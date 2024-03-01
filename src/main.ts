import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/logger.service.interface';
import { TYPES } from './types';
import { LoggerService } from './helpers/logger/logger.service';
import { IExceptionFilter } from './interfaces/exception.filter.interface';
import { ExceptionFilter } from './helpers/errors/exception.filter';
import { App } from './app';
import { IConfigService } from './interfaces/config.interface';
import { ConfigService } from './helpers/config/config.service';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();

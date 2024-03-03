import { inject, injectable } from 'inversify';
import { IUserService } from '../interfaces/user.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../interfaces/config.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserModel } from '../interfaces/user.model.interface';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserLoginDto } from './dto/user-login.dto';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<IUserModel | null> {
		const newUser = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser?.email, existedUser?.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<IUserModel | null> {
		return this.userRepository.find(email);
	}
}

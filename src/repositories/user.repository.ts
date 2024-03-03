import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { IUserModel } from '../interfaces/user.model.interface';
import { UserModel } from '../models/User/User';

@injectable()
export class UserRepository implements IUserRepository {
	constructor() {}

	async create({ email, password, name }: User): Promise<IUserModel> {
		const user = new UserModel({
			name,
			email,
			password,
		});
		return await user.save();
	}

	async find(email: string): Promise<IUserModel | null> {
		return await UserModel.findOne({ email: email });
	}
}

import { ObjectId } from 'mongoose';
import { Task } from '../entities/task.entity';
import { ITaskModel } from '../interfaces/task.model.interface';
import { ITaskRepository } from '../interfaces/task.repository.interface';
import { TaskModel } from '../models/Task/Task';
import { injectable } from 'inversify';

@injectable()
export class TaskRepository implements ITaskRepository {
	constructor() {}

	async create({ title, description, deadline, user }: Task): Promise<ITaskModel> {
		const task = new TaskModel({
			title,
			description,
			deadline,
			user,
		});
		return await task.save();
	}

	async find(id: ObjectId): Promise<ITaskModel | null> {
		return await TaskModel.findOne({ _id: id });
	}

	async getAll(userId: ObjectId): Promise<Promise<ITaskModel | null>[]> {
		return await TaskModel.find({ user: userId });
	}
}

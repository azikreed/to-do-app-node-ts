import mongoose, { ObjectId } from 'mongoose';
import { Task } from '../entities/task.entity';
import { ITaskModel } from '../interfaces/task.model.interface';
import { ITaskRepository } from '../interfaces/task.repository.interface';
import { TaskModel } from '../models/Task/Task';
import { injectable } from 'inversify';
import { ITaskUpdate } from '../interfaces/task.update.interface';
@injectable()
export class TaskRepository implements ITaskRepository {
	constructor() {}

	async create({ title, description, deadline, done, user }: Task): Promise<ITaskModel> {
		const task = new TaskModel({
			title,
			description,
			deadline,
			done,
			user,
		});
		return await task.save();
	}

	async find(id: mongoose.Types.ObjectId): Promise<ITaskModel | null> {
		return await TaskModel.findOne({ _id: id });
	}

	async getAll(userId: ObjectId, condition?: object): Promise<Promise<ITaskModel | null>[]> {
		return await TaskModel.find({ user: userId, done: false, ...condition });
	}

	async getOne(id: mongoose.Types.ObjectId): Promise<ITaskModel | null> {
		return await TaskModel.findOne({ _id: id });
	}

	async update(id: mongoose.Types.ObjectId, data: ITaskUpdate): Promise<ITaskModel | null> {
		return await TaskModel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
	}

	async delete(id: mongoose.Types.ObjectId): Promise<boolean> {
		const { deletedCount } = await TaskModel.deleteOne(id);
		return Boolean(deletedCount);
	}
}

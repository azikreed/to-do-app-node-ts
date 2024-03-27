import { inject, injectable } from 'inversify';
import { ITaskRepository } from '../interfaces/task.repository.interface';
import { ITaskService } from '../interfaces/task.service.interface';
import { TYPES } from '../types';
import { TaskCreateDto } from './dto/task.dto';
import { ITaskModel } from '../interfaces/task.model.interface';
import { Task } from '../entities/task.entity';
import mongoose, { ObjectId } from 'mongoose';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { ITaskUpdate } from '../interfaces/task.update.interface';

@injectable()
export class TaskService implements ITaskService {
	constructor(
		@inject(TYPES.TaskRepository) private taskRepository: ITaskRepository,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createTask({
		title,
		description,
		deadline,
		user,
	}: TaskCreateDto): Promise<ITaskModel | null> {
		const existedUser = await this.userRepository.find(user);
		const newTask = new Task(title, description, deadline, existedUser?._id);
		return this.taskRepository.create(newTask);
	}

	async getAll(email: string, condition?: object): Promise<Promise<ITaskModel | null>[]> {
		const user = await this.userRepository.find(email);
		return await this.taskRepository.getAll(user?._id, condition);
	}

	async findTask(id: mongoose.Types.ObjectId): Promise<ITaskModel | null> {
		return await this.taskRepository.find(id);
	}

	async updateTask(id: mongoose.Types.ObjectId, data: ITaskUpdate): Promise<ITaskModel | null> {
		return await this.taskRepository.update(id, data);
	}

	async deleteTask(id: mongoose.Types.ObjectId): Promise<boolean> {
		return await this.taskRepository.delete(id);
	}
}

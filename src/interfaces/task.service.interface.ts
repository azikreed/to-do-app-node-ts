import mongoose from 'mongoose';
import { TaskCreateDto } from '../services/dto/task.dto';
import { ITaskModel } from './task.model.interface';
import { ITaskUpdate } from './task.update.interface';

export interface ITaskService {
	createTask: (dto: TaskCreateDto) => Promise<ITaskModel | null>;
	getAll: (email: string) => Promise<Promise<ITaskModel | null>[]>;
	// getOne: (id: ObjectId) => Promise<ITaskModel | null>;
	updateTask: (id: mongoose.Types.ObjectId, data: ITaskUpdate) => Promise<ITaskModel | null>;
}

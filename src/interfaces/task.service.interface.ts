import mongoose from 'mongoose';
import { TaskCreateDto } from '../services/dto/task.dto';
import { ITaskModel } from './task.model.interface';
import { ITaskUpdate } from './task.update.interface';

export interface ITaskService {
	createTask: (dto: TaskCreateDto) => Promise<ITaskModel | null>;
	getAll: (email: string, condition?: object) => Promise<Promise<ITaskModel | null>[]>;
	findTask: (id: mongoose.Types.ObjectId) => Promise<ITaskModel | null>;
	updateTask: (id: mongoose.Types.ObjectId, data: ITaskUpdate) => Promise<ITaskModel | null>;
	deleteTask: (id: mongoose.Types.ObjectId) => Promise<boolean>;
}

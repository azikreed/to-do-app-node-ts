import { ObjectId } from 'mongoose';
import { TaskCreateDto } from '../services/dto/task.dto';
import { ITaskModel } from './task.model.interface';

export interface ITaskService {
	createTask: (dto: TaskCreateDto) => Promise<ITaskModel | null>;
	getAll: (email: string) => Promise<Promise<ITaskModel | null>[]>;
}

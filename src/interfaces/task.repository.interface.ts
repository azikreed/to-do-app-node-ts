import mongoose, { ObjectId } from 'mongoose';
import { Task } from '../entities/task.entity';
import { ITaskModel } from './task.model.interface';
import { ITaskUpdate } from './task.update.interface';

export interface ITaskRepository {
	create: (task: Task) => Promise<ITaskModel>;
	getAll: (userId: ObjectId) => Promise<Promise<ITaskModel | null>[]>;
	find: (id: ObjectId) => Promise<ITaskModel | null>;
	update: (id: mongoose.Types.ObjectId, data: ITaskUpdate) => Promise<ITaskModel | null>;
	delete: (id: mongoose.Types.ObjectId) => Promise<boolean | null>;
}

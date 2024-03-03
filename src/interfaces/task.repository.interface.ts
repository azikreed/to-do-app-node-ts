import { ObjectId } from 'mongoose';
import { Task } from '../entities/task.entity';
import { ITaskModel } from './task.model.interface';

export interface ITaskRepository {
	create: (task: Task) => Promise<ITaskModel>;
	getAll: (userId: ObjectId) => Promise<Promise<ITaskModel | null>[]>;
	find: (id: ObjectId) => Promise<ITaskModel | null>;
	// update: (id: ObjectId, data: Task) => Promise<ITaskModel | null>;
	// delete: (id: ObjectId) => Promise<boolean>;
}

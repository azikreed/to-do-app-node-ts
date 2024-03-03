import mongoose, { Schema } from 'mongoose';
import { ITaskModel } from '../../interfaces/task.model.interface';

const taskSchema = new Schema<ITaskModel>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	deadline: { type: Date, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const TaskModel = mongoose.model<ITaskModel>('Task', taskSchema);

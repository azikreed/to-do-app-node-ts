import { Document, ObjectId } from 'mongoose';
import { IUserModel } from './user.model.interface';

export interface ITaskModel extends Document {
	title: string;
	description: string;
	deadline: Date;
	done: boolean;
	createdAt: Date;
	updatedAt: Date;
	user: ObjectId | IUserModel;
}

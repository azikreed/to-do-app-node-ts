import { Document } from 'mongoose';

export interface IUserModel extends Document {
	email: string;
	password: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

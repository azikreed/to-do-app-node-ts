import { Document } from 'mongoose';

export interface IUserModel extends Document {
	id: number;
	email: string;
	password: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

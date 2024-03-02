import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUserModel } from '../../interfaces/user.model.interface';

const userSchema = new Schema({
	id: { type: String, default: uuidv4, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUserModel>('User', userSchema);

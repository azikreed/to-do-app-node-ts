import { IsDate, IsDateString, IsString } from 'class-validator';
import { ObjectId, isObjectIdOrHexString } from 'mongoose';

export class TaskCreateDto {
	@IsString({ message: 'Неверно указан заголовок' })
	title: string;
	@IsString({ message: 'Описание указано неверно' })
	description: string;
	@IsDateString({}, { message: 'Неверно указан дедлайн' })
	deadline: string;
	user: string;
}

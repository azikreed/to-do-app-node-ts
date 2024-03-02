import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Не указан email' })
	email: string;
	@IsString({ message: 'Неверно указан пароль' })
	password: string;
	@IsString({ message: 'Неверно указано имя' })
	name: string;
}

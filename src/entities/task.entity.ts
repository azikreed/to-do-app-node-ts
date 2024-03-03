import { ObjectId } from 'mongoose';

export class Task {
	constructor(
		private readonly _title: string,
		private readonly _description: string,
		private readonly _deadline: string,
		private readonly _user: ObjectId,
	) {}

	get title(): string {
		return this._title;
	}

	get description(): string {
		return this._description;
	}

	get deadline(): string {
		return this._deadline;
	}

	get user(): ObjectId {
		return this._user;
	}
}

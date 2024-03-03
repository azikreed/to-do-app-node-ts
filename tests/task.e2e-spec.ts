import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Task e2e', () => {
	it('Create - success', async () => {
		const login = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '12345678' });
		const user = await request(application.app)
			.get('/user/info')
			.set('Authorization', `Bearer ${login.body.token}`);
		const res = await request(application.app)
			.post('/task/create')
			.send({
				title: 'any title',
				description: 'Anything else to do at the time and etc.',
				deadline: '2019-04-28T14:45:15',
				user: user.body._id,
			})
			.set('Authorization', `Bearer ${login.body.token}`);

		expect(res.statusCode).toBe(200);
	});

	it('Create - error', async () => {
		const login = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '12345678' });
		const user = await request(application.app)
			.get('/user/info')
			.set('Authorization', `Bearer ${login.body.token}`);
		const res = await request(application.app).post('/task/create').send({
			title: 'any title',
			description: 'Anything else to do at the time and etc.',
			deadline: '2019-04-28T14:45:15',
			user: user.body._id,
		});

		expect(res.statusCode).toBe(401);
	});

	it('getAll - success', async () => {
		const login = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '12345678' });
		const res = await request(application.app)
			.get('/task/get')
			.set('Authorization', `Bearer ${login.body.token}`);

		expect(res.statusCode).toBe(200);
	});

	it('getAll - error', async () => {
		const res = await request(application.app).get('/task/get').set('Authorization', `Bearer 1`);

		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});

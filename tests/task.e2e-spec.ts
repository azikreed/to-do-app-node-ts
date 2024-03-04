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

	// it('getOne - success', async () => {
	// 	const login = await request(application.app)
	// 		.post('/user/login')
	// 		.send({ email: 'azikreed@gmail.com', password: '12345678' });
	// 	const getAll = await request(application.app)
	// 		.get('/task/get')
	// 		.set('Authorization', `Bearer ${login.body.token}`);
	// 	const res = await request(application.app)
	// 		.get(`/task/get/65e4691401730a4a114d5a82`)
	// 		.set('Authorization', `Bearer ${login.body.token}`);

	// 	expect(res.statusCode).toBe(200);
	// });

	// it('getOne - error', async () => {
	// 	const login = await request(application.app)
	// 		.post('/user/login')
	// 		.send({ email: 'azikreed@gmail.com', password: '12345678' });
	// 	const res = await request(application.app)
	// 		.get(`/task/get/65e4691401730a4a114d5a8`)
	// 		.set('Authorization', `Bearer ${login.body.token}`);

	// 	expect(res.statusCode).toBe(400);
	// });

	// it('update - success', async () => {
	// 	const login = await request(application.app)
	// 		.post('/user/login')
	// 		.send({ email: 'azikreed@gmail.com', password: '12345678' });
	// 	const res = await request(application.app)
	// 		.patch('/task/update/65e4691401730a4a114d5a82')
	// 		.send({ title: 'not any title not not', updatedAt: new Date() })
	// 		.set('Authorization', `Bearer ${login.body.token}`);

	// 	expect(res.statusCode).toBe(200);
	// });

	// it('update - error', async () => {
	// 	const login = await request(application.app)
	// 		.post('/user/login')
	// 		.send({ email: 'azikreed@gmail.com', password: '12345678' });
	// 	const res = await request(application.app)
	// 		.patch('/task/update/65e4691401730a4a114d5a81')
	// 		.send({ title: 'not any title not not', updatedAt: new Date() })
	// 		.set('Authorization', `Bearer ${login.body.token}`);

	// 	expect(res.statusCode).toBe(400);
	// });

	// it('delete - success', async () => {
	// 	const login = await request(application.app)
	// 		.post('/user/login')
	// 		.send({ email: 'azikreed@gmail.com', password: '12345678' });
	// 	const getAll = await request(application.app)
	// 		.get('/task/get')
	// 		.set('Authorization', `Bearer ${login.body.token}`);
	// 	const res = await request(application.app)
	// 		.patch('/task/delete/65e4691401730a4a114d5a82')
	// 		.set('Authorization', `Bearer ${login.body.token}`);

	// 	expect(res.statusCode).toBe(200);
	// });
});

afterAll(() => {
	application.close();
});

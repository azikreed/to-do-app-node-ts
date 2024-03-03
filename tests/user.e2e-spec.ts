import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('User e2e', () => {
	it('Register - success', async () => {
		const res = await request(application.app)
			.post('/user/register')
			.send({ name: 'Ali', email: `aliabd${Date.now()}@gmail.com`, password: '12345678' });

		expect(res.statusCode).toBe(200);
	});

	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/user/register')
			.send({ email: 'azikreed@gmail.com', password: '1' });

		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '12345678' });

		expect(res.body.token).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '2' });

		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/user/login')
			.send({ email: 'azikreed@gmail.com', password: '12345678' });
		const res = await request(application.app)
			.get('/user/info')
			.set('Authorization', `Bearer ${login.body.token}`);

		expect(res.body.email).toBe('azikreed@gmail.com');
	});

	it('Info - error', async () => {
		const res = await request(application.app).get('/user/info').set('Authorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(async () => {
	application.close();
});

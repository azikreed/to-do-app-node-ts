run:
	docker run -d -p 8000:8000 --env-file ./.env --rm --name todoapp azikreed/todoapp
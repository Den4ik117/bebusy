up:
	@docker compose up -d
	@docker compose exec -u root -d php supervisord
	@docker compose exec -d vite npm run dev -- --host
down:
	@docker compose down
restart r:
	@make down
	@make up

bash:
	@docker compose exec php bash
node-bash:
	@docker compose exec vite sh

prod-up:
	@docker compose up -d
	@docker compose exec -u root -d php supervisord
prod-restart prod-r:
	@make down
	@make prod-up
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
bash-root:
	@docker compose exec -u root php bash
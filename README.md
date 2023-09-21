Запуск миграций:

`curl -sSf https://atlasgo.sh | sh`
`atlas schema apply -u "mysql://root:root@localhost:3307/placement" --to file://src/database/database.sql --dev-url "docker://mysql/8/example"`

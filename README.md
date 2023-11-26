# BEBUSY ― социальная сеть для соискателей

**Будь занятым, имей работу!**

[Ссылка на сайт](https://bebusy.ru/)

[Телеграм автора](https://t.me/denchik1170)

## О проекте

Backend и Frontend написаны на одном языке ― JavaScript.
В основе проекта лежит фреймворк [Express](https://expressjs.com/ru/).

Код серверной части приложения находится в папке `src`.
Клиентская часть ― папка `resources`.

База данных ― MySQL. Запускается в докер-контейнере командой:

```shell
docker compose up
```

Авторизация происходит через [hh.ru](https://dev.hh.ru/) с применение протокола [OAuth 2.0](https://oauth.net/2/).

Чат написан с применением технологии [WebSockets](https://developer.mozilla.org/ru/docs/Web/API/WebSockets_API) на фреймворке [VueJS](https://vuejs.org/) и [Vite](https://vitejs.dev/) в качестве инструмента сборки скриптов и стилей.

Для простоты внедрения изменений код серверной части написан с использованием [чистой архитектуры](https://habr.com/ru/articles/269589/) на языке [TypeScript](https://www.typescriptlang.org/).

Запуск миграций:

```shell
curl -sSf https://atlasgo.sh | sh
atlas schema apply -u "mysql://root:root@localhost:3307/placement" --to file://src/database/database.sql --dev-url "docker://mysql/8/placement"
```

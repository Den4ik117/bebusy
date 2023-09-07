const ws = require('ws');
const mysql = require('mysql2');
const http = require('http');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

// connection.query('SELECT * FROM `users` ORDER BY `id` DESC LIMIT 2', function (err, results ) {
//     console.log(err, results);
// });

app.get('/', (req, res) => {
    res.send('test');
});

app.post('/bots/:token/sendMessage', (req, res) => {
    const { token } = req.params;
    const { chat_id, text } = req.body;

    connection.execute(
        'SELECT * FROM `users` WHERE `token` = ? LIMIT 1',
        [token],
        function (err, results) {
            const { id: user_id } = results[0];

            const now = (new Date()).toISOString().slice(0, 19).replace('T', ' ');

            connection.execute(
                'INSERT INTO `messages` (text, user_id, chat_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
                [text, user_id, chat_id, now, now],
                function (err, results) {
                    console.log(err, results);
                },
            );

            connection.execute(
                'SELECT * FROM `messages` WHERE id = LAST_INSERT_ID() ORDER BY `id` DESC LIMIT 1',
                function (err, messages) {
                    connection.execute(
                        'SELECT * FROM `users` WHERE `id` = ? ORDER BY `id` DESC LIMIT 1',
                        [user_id],
                        function (err, users) {
                            const message = messages[0];
                            message.user = users[0];

                            // console.log(err, message);

                            broadcastMessage({
                                type: 'message',
                                data: message,
                            });
                        }
                    );
                },
            );
        },
    );
});

const wss = new ws.WebSocketServer({
    // port: PORT,
    server: server,
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);

        switch (message.event) {
            case 'message':
                const { text, user_id, chat_id } = message;

                if (!text || !user_id || !chat_id) {
                    broadcastMessage({ error: 'Не заполнены данные' });
                    break;
                }

                const now = (new Date()).toISOString().slice(0, 19).replace('T', ' ');

                connection.execute(
                    'INSERT INTO `messages` (text, user_id, chat_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
                    [text, user_id, chat_id, now, now],
                    function (err, results) {
                        console.log(err, results);
                    },
                );

                connection.execute(
                    'SELECT * FROM `messages` WHERE id = LAST_INSERT_ID() ORDER BY `id` DESC LIMIT 1',
                    function (err, messages) {
                        connection.execute(
                            'SELECT * FROM `users` WHERE `id` = ? ORDER BY `id` DESC LIMIT 1',
                            [user_id],
                            function (err, users) {
                                const message = messages[0];
                                message.user = users[0];

                                connection.execute(
                                    'INSERT INTO `updates` (message_id, user_id) VALUES (?, ?)',
                                    [message.id, user_id],
                                    function (err, results) {
                                        console.log(err, results);
                                    },
                                );

                                connection.execute(
                                    'SELECT * FROM `users` WHERE `id` = 2 LIMIT 1',
                                    function (err, users) {
                                        const { webhook_url } = users[0];

                                        connection.execute(
                                            'SELECT * FROM `updates` WHERE id = LAST_INSERT_ID() LIMIT 1',
                                            function (err, updates) {
                                                const update = updates[0];

                                                update.message = message;

                                                axios.post(webhook_url, {
                                                    data: update,
                                                }).then(response => {
                                                    console.log(response.status);
                                                });
                                            },
                                        );
                                    },
                                );

                                // console.log(err, message);

                                broadcastMessage({
                                    type: 'message',
                                    data: message,
                                });
                            }
                        );
                    },
                );

                break;
            case 'connection':
                broadcastMessage(message);
                break;

        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}

server.listen(process.env.APP_PORT, () => console.log(`Server started at ${process.env.APP_PORT}`));

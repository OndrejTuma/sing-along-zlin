const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const mongoose = require('mongoose');

const Chapter = require('./models/Chapter');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const APP_PORT = 3000;

mongoose
    .connect(
        'mongodb://mongo:27017/sing-along',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.urlencoded({ extended: false }));

        server.get('*', async (req, res) => {
            const chapters = await Chapter.find();
            return handle(req, Object.assign(res, {chapters: chapters}));
        });

        server.post('/chapter/add', (req, res) => {
            const newChapter = new Chapter({
                title: req.body.title,
                body: req.body.body,
            });

            newChapter.save().then(() => res.redirect('/'));
        });

        server.listen(APP_PORT, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${APP_PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    });
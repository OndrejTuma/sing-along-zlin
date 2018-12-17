const bodyParser = require('body-parser');
const cookie = require('cookie');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const next = require('next');

const secret = require('./consts/secret');
const tokenName = require('./api/token_name');
const userHelper = require('./helpers/server');

const Chapter = require('./models/Chapter');
const Song = require('./models/Song');
const User = require('./models/User');

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

        server.use(bodyParser.json());

        // update token
        server.all('*', (req, res, next) => {
            // TODO: not all request, just page requests
            const token = cookie.parse(req.headers.cookie)[tokenName];

            let data = false;
            try {
                data = jwt.verify(token, secret);

                req.token = userHelper.login(data);
                req.login = data.login;
            } catch (e) {
            }

            next();
        });

        server.get('*', async (req, res) => {
            const songs = await Song.find();

            return handle(req, Object.assign(res, {
                songs: songs,
                token: req.token,
            }));
        });

        server.post('/chapter/create', (req, res) => {
            const newChapter = new Chapter({
                title: req.body.title,
                body: req.body.body,
                token: req.token,
            });

            newChapter.save().then(() => res.redirect('/'));
        });
        server.post('/song/create', async (req, res) => {
            const token = req.token;

            if (!token) {
                return res.status(200).json({error: 'you must be logged in'});
            }

            try {
                const newSong = new Song({
                    author: req.login,
                    title: req.body.title,
                    text: req.body.text,
                });

                await newSong.save();

                res.status(200).json({
                    song: newSong,
                    token: token,
                });
            } catch (e) {
                res.status(500).json(e);
            }
        });
        server.post('/song/delete', async (req, res) => {
            const token = req.token;

            if (!token) {
                return res.status(200).json({error: 'you must be logged in'});
            }

            try {
                await Song.deleteOne({
                    title: req.body.title,
                });

                res.status(200).json({
                    success: true,
                    token: token,
                });
            } catch (e) {
                res.status(500).json(e);
            }
        });
        server.post('/song/fetch/all', async (req, res) => {
            const token = req.token;

            if (!token) {
                return res.status(200).json({error: 'you must be logged in'});
            }

            try {
                const songs = await Song.find();

                res.status(200).json({
                    songs: songs,
                    token: token,
                });
            } catch (e) {
                res.status(500).json(e);
            }
        });
        server.post('/user/create', (req, res) => {
            const token = req.token;

            const newUser = new User({
                login: req.body.login,
                password: req.body.password,
            });

            newUser.save().then(() => res.redirect('/'));
        });
        server.post('/user/login', async (req, res) => {
            try {
                const user = await User.findOne({
                    login: req.body.login,
                    password: req.body.password,
                });

                if (!user) {
                    return res.status(200).json({error: 'invalid credentials'});
                }

                const JWT = userHelper.login(user);

                res.status(200).json({token: JWT});
            } catch (e) {
                res.status(500).json(e);
            }
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
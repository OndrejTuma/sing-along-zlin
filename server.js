const bodyParser = require('body-parser');
const cookie = require('cookie');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const next = require('next');

const secret = require('./consts/secret');
const tokenName = require('./api/token_name');

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

        server.get('*', async (req, res) => {
            const token = cookie.parse(req.headers.cookie)[tokenName];

            let data = false;
            try {
                data = jwt.verify(token, secret);
            } catch (e) {

            }

            const songs = await Song.find();

            return handle(req, Object.assign(res, {
                songs: songs,
                isLogged: data && data.login,
            }));
        });

        server.post('/chapter/create', (req, res) => {
            const token = cookie.parse(req.headers.cookie)[tokenName];

            const newChapter = new Chapter({
                title: req.body.title,
                body: req.body.body,
            });

            newChapter.save().then(() => res.redirect('/'));
        });
        server.post('/song/create', async (req, res) => {
            const token = cookie.parse(req.headers.cookie)[tokenName];

            if (!token) {
                return res.status(200).json({error: 'you must be logged in'});
            }

            try {
                const data = jwt.verify(token, secret);

                const newSong = new Song({
                    author: data.login,
                    title: req.body.title,
                    text: req.body.text,
                });

                await newSong.save();

                res.status(200).json({success: true});
            } catch (e) {
                res.status(500).json(e);
            }
        });
        server.post('/song/delete', async (req, res) => {
            const token = cookie.parse(req.headers.cookie)[tokenName];

            if (!token) {
                return res.status(200).json({error: 'you must be logged in'});
            }

            try {
                jwt.verify(token, secret);

                await Song.deleteOne({
                    title: req.body.title,
                });

                res.status(200).json({success: true});
            } catch (e) {
                res.status(500).json(e);
            }
        });

        server.post('/user/create', (req, res) => {
            const token = cookie.parse(req.headers.cookie)[tokenName];

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

                const JWT = jwt.sign({
                    login: user.login,
                }, secret, {
                    expiresIn: 120, // 120s
                });

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
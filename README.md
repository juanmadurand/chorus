# Chorus

A chat just for practice:
* [Bootstrap](http://getbootstrap.com/) - great UI boilerplate for modern web apps
* [React](https://facebook.github.io/react/) - a javascript library for building user interfaces
* [Redux](http://redux.js.org/) - predictable state container for JavaScript apps
* [Express](http://expressjs.com/) - fast node.js network app framework
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [MongoDB](https://www.mongodb.org/) - the Mongo database


### Development

```
npm run dev
```
And then point your browser to `localhost:3000`


### API

Routes from API requires authentication:
* `/api`
    * `/user`
        * `POST /create`
            * Creates a new user
            * **Requires**: `username`, `password`
            * **Accepts**: `name`, `age`
        * `GET /all`
            * List all users
        * `GET /:username`
            * Get user by username
        * `POST /login`
            * Login into the system
            * **Requires**: `username`, `password`


### Installation

You need to get installed locally:
- [MongoDB](https://www.mongodb.org/)
- [Redis](http://redis.io/)

THen just run:

```sh
$ npm install
$ npm start
```

License
----

MIT


**Free Software, Hell Yeah!**

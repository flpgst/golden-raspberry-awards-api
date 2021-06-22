## Description

[Golden Raspberry Awards API](https://github.com/flpgst/golden-raspberry-awards-api) Api for TexoIT vacancy test.

## Installation

```bash
# using docker
docker build . -t <dockerImageName>
```

or

```bash
# using npm
$ npm install
```

## Running the app

With Docker

```bash
# docker initialization
docker run -p 3000:3000 -d <dockerImageName>
```

or with NPM

```bash
# first build project
$ npm run build
```

```bash
# copy CSV file to dist folder
$ mkdir dist/config && cp src/config/movielist.csv dist/config/
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

```bash
# Swagger Docs
http://localhost:3000/api
```

## Routes

```bash
# This route implements all HTTP methods
# GET: returns all movie list
# POST: create movie
# PATCH/{id}: update movie
# DELETE/{id}: delete movie
http://localhost:3000/movies
```

```bash
# This route transform all movies in winners to test intervals route
# PATCH: return void
http://localhost:3000/awards/setFakeWinners
```

```bash
# GET: returns winners max and min intervals
http://localhost:3000/awards/intervals
```

## Author

- [Filipe Augusto Gonçalves](https://www.linkedin.com/in/filipe-augusto/)

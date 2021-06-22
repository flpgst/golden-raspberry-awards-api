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

```bash
# docker initialization 
docker run -p 3000:3000 -d <dockerImageName>
```

or

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
copy CSV file to dist folder

```bash
# Do that just with you run with npm
$ cp ./src/config/movielist.csv ./dist/config/movielist.csv
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

## Routes

```bash
# This route implements all HTTP methods
# GET: returns all movie list
http://localhost:3000/movies
```

```bash
# GET: returns winners max and min intervals
http://localhost:3000/awards/intervals
```

## Author

- [Filipe Augusto Gonçalves](https://www.linkedin.com/in/filipe-augusto/)

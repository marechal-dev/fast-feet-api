<p align="center">
  <img src="./.github/assets/FastFeetCover.png" width="740" alt="FastFeet Logo" />
</p>


## Description

API for controlling orders from a fictitious carrier, FastFeet.

## Project setup

First, you need to setup a `.env` file based on `.env.example`.

Then you can run:

### On Docker

```bash
$ docker compose build --no-cache
```

### Locally

It is necessary to spin-up a PostgreSQL container and a Redis container. After this initial setup, update your `.env` file and run:

```bash
$ npm install
$ npx prisma migrate dev
```

## Running the API

### On Docker

```bash
# development (first time)
$ docker compose up

# development (first time, detached)
$ docker compose up -d

# development (after running up at least one time)
$ docker compose start

# stop development
$ docker compose stop
```

### Locally

```bash
# development
$ npm run start:dev

# docs (via Compodocs)
$ npm run start:docs
```

## Docs

- Swagger Endpoint: `/api/docs`;
- Compodocs (see [Running the API > Locally](#locally-1));
- More documentation (ERD diagram, C4 diagram and other diagrams) will be added in the future;

## Run tests

```bash
# tests ui
$ npm run test:ui

# unit tests
$ npm run test

# unit tests coverage
$ npm run test:cov

# unit tests (watch mode)
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# e2e tests (watch mode)
$ npm run test:e2e:watch

# e2e tests coverage
$ npm run test:e2e:cov
```

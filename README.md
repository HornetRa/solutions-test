# solutions-test

Digital business card API built with NestJS, GraphQL, Prisma and PostgreSQL.

## Запуск через Docker (проще всего)

```bash
docker compose up -d
```

Поднимет базу и приложение, сам накатит схему и засеет данные.

- GraphQL sandbox: http://localhost:3000/graphql
- Health check: http://localhost:3000/health

Остановить:

```bash
docker compose down
```

## Локальный запуск

1. Установить зависимости:

```bash
npm install
```

2. Скопировать `.env.example` в `.env` и при необходимости поправить:

```bash
cp .env.example .env
```

3. Поднять базу (только Postgres, без приложения):

```bash
docker compose up -d db
```

4. Накатить схему и засеять данные:

```bash
npm run db:push
npm run db:seed
```

5. Запустить приложение:

```bash
npm run start:dev
```

## Тесты

Юнит-тесты:

```bash
npm run test
```

E2E-тесты (нужна отдельная тестовая база):

```bash
docker compose up -d db-test
npm run test:e2e
```

## Линт и форматирование

```bash
npm run lint
npm run format
```

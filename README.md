# Контрольная работа №5 — Итоговый проект

## Выполненные практические работы: №25 Webpack/Vite | №26 GraphQL | №27 RabbitMQ

## Что выполнено в каждой практической

№25 Webpack/Vite: создано React-приложение с Vite, реализованы два маршрута (Главная и О нас), применена ленивая загрузка через React.lazy и Suspense, добавлен анализатор бандла (rollup-plugin-visualizer), production сборка работает без ошибок.

№26 GraphQL: реализован GraphQL API с Apollo Server, созданы типы Book и Author со связью "один-ко-многим", реализованы Query (books, book, authors, author) и Mutation (createBook, createAuthor), написаны резолверы для всех полей, сервер запущен на порту 4000.

№27 RabbitMQ: реализована система асинхронной обработки задач с RabbitMQ, создан Producer API на Express (POST /tasks), реализованы Consumer-воркеры с retry логикой (экспоненциальная задержка, 3 попытки), настроена Dead Letter Queue (DLQ), запущены два воркера, задачи распределяются между ними.

## Как проверить

### №25 Webpack/Vite
Запуск: cd front5kr && npm install && npm run dev
Проверка: открыть http://localhost:5173, переключение между страницами "Главная" и "О нас (lazy)" — страница "О нас" загружается отдельным чанком.
Сборка: npm run build, откроется bundle-report.html с визуализацией бандла.

### №26 GraphQL
Запуск: cd graphql-books && npm install && node server.js
Проверка: открыть http://localhost:4000, выполнить в Apollo Sandbox запросы:
  query { books { title year author { name } } }
  query { author(id: "1") { name books { title } } }
  mutation { createBook(title: "Новая книга", authorId: "1", year: 2024) { id title } }

### №27 RabbitMQ
Запуск: cd rabbitmq-tasks && docker compose up -d
  PORT=3003 node producer.js (терминал 1)
  WORKER_ID=1 node worker.js (терминал 2)
  WORKER_ID=2 node worker.js (терминал 3)
Проверка: curl -X POST http://localhost:3003/tasks -H "Content-Type: application/json" -d '{"type":"email","payload":{"to":"test@mail.com","subject":"Hello"}}'
Ожидаемый результат: один из воркеров обрабатывает задачу, при ошибке происходит повтор через экспоненциальную задержку (3 попытки), затем задача уходит в DLQ.

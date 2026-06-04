# YMC Plumbing CRM

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8)
![Slack](https://img.shields.io/badge/Slack-Integrated-4A154B)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Integrated-34A853)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

<p align="left">
  <a href="README.md">Switch to English</a>
</p>

## Обзор

Этот проект представляет собой упрощённую CRM-систему для управления рабочими заказами сантехнической службы.

Приложение позволяет:

* Создавать и управлять лидами (клиентами)
* Создавать заказы (Jobs) для выбранных лидов
* Отслеживать статус заказа на протяжении его жизненного цикла
* Логировать события системы
* Автоматически отправлять уведомления в Slack
* Автоматически записывать события рабочего процесса в Google Sheets

Проект реализован с простой и поддерживаемой архитектурой, ориентированной на надёжность.

## Живая демонстрация

Vercel URL:

[Попробовать приложение онлайн](https://ymc-plumbing-crm.vercel.app)

## Технический стек

### Фронтенд

* Next.js
* React
* TypeScript
* Tailwind CSS

### Бэкенд

* Next.js Route Handlers
* Prisma ORM

### База данных

* Архитектура проекта позволяет использовать как PostgreSQL, так и SQLite через Prisma ORM

### Валидация

* Zod
* React Hook Form

### Интеграции

* Slack Incoming Webhooks
* Google Sheets API

### Деплой

* Vercel
* Neon

## Рабочий процесс приложения

Приложение моделирует упрощённый рабочий процесс сантехнической службы.

### 1. Создание лида

Лид представляет потенциального клиента.

Пользователь создаёт лида, вводя:

* Имя
* Фамилию
* Номер телефона
* Email (необязательно)

Лид сохраняется в PostgreSQL.

### 2. Создание заказа (Job)

После выбора лида пользователь может создать заказ.

Заказ содержит:

* Тип работы
* Источник лида
* Описание
* Адрес выполнения
* Информацию о расписании
* Назначенного техника

Каждый заказ связан ровно с одним лидом.

Новые заказы создаются со статусом по умолчанию:

```text
JOB_CREATED
```

### 3. Логирование событий

Каждое значимое действие создаёт запись в логе событий.

Примеры:

* Заказ создан
* Статус изменён
* Отправлено уведомление в Slack
* Обновлена Google Sheets

## Имитация CRM

Проект намеренно использует упрощённую модель CRM.

Цель — продемонстрировать:

* Управление лидами
* Управление заказами
* Автоматизацию рабочего процесса
* Внешние интеграции

Упрощённая структура делает бизнес-процесс лёгким для понимания и проверки.

Основные сущности:

```text
Lead
  ↓
Job
  ↓
Automation
```

Связь:

```text
Один Lead
    ↓
Много Jobs
```

## Автоматизация

Приложение включает два канала автоматизации:

### Уведомления в Slack

Когда заказ создаётся или его статус изменяется:

* В Slack отправляется сообщение
* Действие записывается в Event Log

### Логирование в Google Sheets

Когда заказ создаётся или его статус изменяется:

* Новая строка добавляется в Google Sheets
* Действие записывается в Event Log

## Архитектура автоматизации

Логика автоматизации централизована в файле:

```text
lib/automation.ts
```

Сервис автоматизации:

* Загружает информацию о заказе
* Загружает связанную информацию о лиде
* Отправляет уведомление в Slack
* Записывает данные в Google Sheets
* Создаёт записи в Event Log

Это сохраняет простоту обработчиков маршрутов и избегает дублирования.

Рабочий процесс:

```text
Job Event
    ↓
runJobAutomation()
    ↓
Slack
    ↓
Google Sheets
    ↓
Event Log
```

## Структура проекта

```text
src/
├── app/
│   ├── api/
│   ├── page.tsx
│   └── components/
│       ├── LeadList.tsx
│       ├── JobBoard.tsx
│       ├── EventLog.tsx
│       ├── CreateLeadModal.tsx
│       ├── CreateJobModal.tsx
│       └── fields/
│           ├── JobBoard.tsx
│           ├── EventLog.tsx
│           ├── CreateLeadModal.tsx
│           └── CreateJobModal.tsx
├── lib/
│   ├── db.ts
│   ├── automation.ts
│   ├── slack.ts
│   └── googleSheets.ts
│
├── prisma/
│
├── schemas/
│
├── types/
│
└── utils/
```

## Локальная установка

Клонируйте репозиторий:

```bash
git clone https://github.com/paper-apple/ymc-plumbing-crm.git
cd ymc-plumbing-crm
```

Создайте .env файл из примера и заполните данные:

```bash
copy .env.example .env
```

В schema.prisma в строке provider укажите используемую БД:

```bash
provider = "postgresql"
или
provider = "sqlite"
```

В .env укажите DATABASE_URL:

```bash

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_db"
или
DATABASE_URL="file:./dev.db"
```

Установите зависимости:

```bash
npm install
```

Сгенерируйте Prisma Client:

```bash
npx prisma generate
```

Выполните миграции:

```bash
npx prisma migrate dev --name init // Создание новой БД
```

Загрузите тестовые данные (опционально):

```bash
npm run seed
```

Запустите сервер разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```

## Деплой

Приложение развёрнуто на:

* Vercel
* Neon PostgreSQL

## Использование ИИ

Инструменты ИИ использовались как помощник в разработке.

Примеры использования:

* Обсуждение архитектурных решений
* Рассмотрение подходов к реализации
* Генерация шаблонного кода
* Объяснение незнакомых API
* Ускорение написания документации

Весь функционал был вручную интегрирован, протестирован и адаптирован под требования проекта.

## Примечания

Этот проект был создан в рамках технического задания, сфокусированного на:

* Full-stack разработке
* Моделировании данных
* Автоматизации рабочих процессов
* Интеграции со сторонними сервисами
* Чистой и поддерживаемой архитектуре

## Контакты

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](birdcherrytea@gmail.com)</br>
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/submarino_amarillo)</br>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dzmitry-paklonski/)
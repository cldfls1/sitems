# 🚨 БЫСТРОЕ ИСПРАВЛЕНИЕ "Error loading data" на Vercel

## Проблема
Сайт на Vercel показывает "Error loading data" - это значит, что фронтенд не может подключиться к бэкенду.

## Главная причина
❌ **НЕТ БАЗЫ ДАННЫХ** - Vercel не предоставляет бесплатную базу данных, нужно подключить внешнюю.

## Решение за 5 минут

### Шаг 1: Создай базу данных на Neon (бесплатно)
1. Иди на https://neon.tech
2. Зарегистрируйся (можно через GitHub)
3. Создай новый проект
4. Скопируй **Connection String** (начинается с `postgresql://`)

### Шаг 2: Добавь в Vercel
1. Открой свой проект на https://vercel.com
2. Settings → Environment Variables
3. Добавь:
   - **Name**: `DATABASE_URL`
   - **Value**: твоя строка подключения из Neon
   - **Environment**: Production ✅

### Шаг 3: Redeploy
1. Deployments → последний деплоймент
2. Три точки → Redeploy
3. Redeploy

### Шаг 4: Готово! 🎉
Через 2-3 минуты сайт заработает.

---

## Что было исправлено в коде

✅ `backend/wsgi.py` - entry point для Vercel
✅ `vercel.json` - настроен правильный роутинг API
✅ `frontend/src/utils/api.js` - автоматически использует `/api` в продакшене
✅ Улучшена обработка ошибок с понятными сообщениями

## Проверка

После деплоя открой в браузере:
- `https://твой-домен.vercel.app/api/health` - должен вернуть JSON с версией

Если не работает:
1. Проверь Vercel Logs (Functions tab)
2. Проверь, что DATABASE_URL добавлен
3. Проверь, что база данных доступна

---

## Альтернатива: Только фронтенд на Vercel

Если не хочешь возиться с базой:

1. Разверни backend на Railway.app:
   - Зарегистрируйся
   - New Project → Deploy from GitHub → выбери папку `backend`
   - Добавь переменную DATABASE_URL (Railway даст свою Postgres)

2. На Vercel добавь переменную:
   - `VITE_API_URL` = `https://твой-backend.up.railway.app/api`

3. Redeploy на Vercel

Готово!

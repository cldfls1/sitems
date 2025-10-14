# Деплой на Vercel - Инструкция

## Проблема
При деплое на Vercel фронтенд не может подключиться к бэкенду, появляется ошибка "Error loading data".

## Решение

### 1. Файлы уже настроены
✅ `vercel.json` - конфигурация для Vercel
✅ `backend/wsgi.py` - entry point для бэкенда
✅ `frontend/src/utils/api.js` - использует относительные URL в продакшене

### 2. Настройка в Vercel Dashboard

Зайди в свой проект на https://vercel.com и добавь переменные окружения:

#### Environment Variables:
1. **DATABASE_URL** (обязательно!)
   - Нужна база данных PostgreSQL для продакшена
   - Можно использовать:
     - Neon (https://neon.tech) - бесплатно
     - Supabase (https://supabase.com) - бесплатно
     - Vercel Postgres - платно
   
   Пример: `postgresql://user:password@host:5432/database`

2. **SECRET_KEY** (рекомендуется)
   - Любая случайная строка
   - Пример: `your-super-secret-key-change-me-123456`

3. **CORS_ORIGIN** (опционально)
   - По умолчанию разрешены все origins
   - Пример: `https://your-domain.vercel.app`

### 3. Как получить DATABASE_URL (Neon)

1. Зайди на https://neon.tech и зарегистрируйся
2. Создай новый проект
3. Скопируй Connection String (выглядит как `postgresql://user:pass@host/db`)
4. Вставь его в Vercel Environment Variables как **DATABASE_URL**

### 4. Redeploy

После добавления переменных окружения:
1. Перейди в раздел "Deployments"
2. Найди последний деплоймент
3. Нажми на три точки → "Redeploy"
4. Выбери "Use existing Build Cache" → Redeploy

### 5. Проверка

После успешного деплоя:
- Фронтенд: `https://your-domain.vercel.app`
- API: `https://your-domain.vercel.app/api/health`

## Альтернатива: Разделённый деплой

Если не хочешь деплоить бэкенд на Vercel, можешь развернуть его отдельно:

### Backend на Railway/Render
1. Создай аккаунт на Railway.app или Render.com
2. Создай новый проект из папки `backend/`
3. Укажи команду запуска: `gunicorn wsgi:app`
4. Получи URL бэкенда (например, `https://your-app.up.railway.app`)

### Frontend на Vercel
1. В Vercel добавь переменную:
   - **VITE_API_URL**: `https://your-backend-url.com/api`
2. Redeploy

## Частые проблемы

### "Error loading data"
- Проверь, что DATABASE_URL настроен
- Проверь, что бэкенд доступен по `/api/health`
- Проверь логи в Vercel Dashboard → Functions

### "CORS error"
- Добавь домен Vercel в CORS_ORIGIN
- Или установи CORS_ORIGIN=* (для тестирования)

### "Database connection failed"
- Проверь правильность DATABASE_URL
- Убедись, что база данных доступна извне
- Neon/Supabase по умолчанию разрешают внешние подключения

## Команды для локальной проверки

```bash
# Проверить, что билд проходит
cd frontend
npm run build

# Проверить, что бэкенд работает
cd backend
python app.py
```

## Итого

1. Создай PostgreSQL базу (Neon/Supabase)
2. Добавь DATABASE_URL в Vercel Environment Variables
3. Redeploy проект
4. Всё должно заработать! 🚀

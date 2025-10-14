# Руководство по деплою на Vercel + Neon

## Подготовка базы данных Neon

1. **Создайте аккаунт на Neon**
   - Перейдите на https://neon.tech
   - Зарегистрируйтесь или войдите

2. **Создайте новый проект**
   - Нажмите "New Project"
   - Выберите регион (ближайший к вашим пользователям)
   - Скопируйте строку подключения DATABASE_URL

3. **Сохраните строку подключения**
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

## Настройка Vercel

### 1. Подготовка репозитория

Создайте Git репозиторий и отправьте код:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Подключение к Vercel

1. Перейдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "Add New Project"
4. Выберите ваш репозиторий
5. Настройте проект:

**Framework Preset:** Vite
**Root Directory:** ./
**Build Command:** `cd frontend && npm install && npm run build`
**Output Directory:** `frontend/build`

### 3. Переменные окружения

Добавьте следующие переменные окружения в настройках Vercel:

#### Backend переменные:
```
DATABASE_URL=<your-neon-database-url>
SECRET_KEY=<generate-secure-key>
FLASK_ENV=production
CORS_ORIGIN=https://your-domain.vercel.app
```

#### Frontend переменные:
```
VITE_API_URL=/api
```

### 4. Дополнительные настройки

**Python Runtime:** Добавьте файл `runtime.txt` в корень проекта:
```
python-3.11
```

## Альтернативная конфигурация для раздельного деплоя

Если вы хотите деплоить frontend и backend отдельно:

### Backend (на Vercel или Railway)

1. Создайте отдельный репозиторий для backend
2. Используйте этот `vercel.json` для backend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ]
}
```

### Frontend (на Vercel)

1. Обновите `VITE_API_URL` на URL вашего backend API
2. Деплойте как обычное Vite приложение

## Railway альтернатива (для backend)

Railway часто проще для Flask приложений:

1. Перейдите на https://railway.app
2. Создайте новый проект из GitHub
3. Добавьте PostgreSQL плагин
4. Railway автоматически настроит `DATABASE_URL`
5. Добавьте другие переменные окружения

**Procfile для Railway:**
```
web: gunicorn app:app
```

## Vercel Serverless Functions (альтернатива)

Создайте структуру для serverless функций:

```
/api
  /__init__.py
  /content.py
  /projects.py
```

Каждый файл экспортирует функцию-обработчик для Vercel.

## Проверка деплоя

После деплоя:

1. **Проверьте API**: `https://your-domain.vercel.app/api/health`
2. **Проверьте frontend**: `https://your-domain.vercel.app`
3. **Проверьте базу данных**: Убедитесь, что таблицы созданы

## Инициализация базы данных

После первого деплоя база данных автоматически инициализируется с тестовыми данными.

Если нужно сбросить данные:
1. Подключитесь к Neon через SQL Editor
2. Удалите таблицы
3. Перезапустите приложение - таблицы будут созданы заново

## Обновление домена

В Vercel:
1. Settings → Domains
2. Добавьте ваш кастомный домен
3. Обновите DNS записи у регистратора домена
4. Обновите `CORS_ORIGIN` в переменных окружения

## Мониторинг

- **Vercel Analytics**: Встроенный мониторинг трафика
- **Neon Dashboard**: Мониторинг запросов к БД
- **Vercel Logs**: Просмотр логов приложения

## Troubleshooting

### Ошибка подключения к БД
- Проверьте формат `DATABASE_URL`
- Убедитесь, что добавлен `?sslmode=require`

### CORS ошибки
- Проверьте `CORS_ORIGIN` в переменных окружения
- Убедитесь, что указан правильный домен

### 404 на API роутах
- Проверьте конфигурацию `vercel.json`
- Убедитесь, что пути начинаются с `/api`

### Build ошибки
- Проверьте версии зависимостей
- Очистите кеш Vercel и попробуйте снова

## Backup базы данных

Neon автоматически создает бэкапы, но вы можете экспортировать данные:

```bash
pg_dump <DATABASE_URL> > backup.sql
```

## Производительность

- Используйте Neon Branch для тестовой среды
- Настройте connection pooling для оптимизации
- Включите кеширование в Vercel для статических ресурсов

## Безопасность

- ✅ Никогда не коммитьте `.env` файлы
- ✅ Используйте сильные SECRET_KEY
- ✅ Регулярно обновляйте зависимости
- ✅ Настройте rate limiting для API
- ✅ Добавьте аутентификацию для админ-панели

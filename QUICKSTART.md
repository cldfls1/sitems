# Быстрый старт

## Установка и запуск локально

### 1. Клонирование и установка

```bash
# Backend
cd backend
pip install -r requirements.txt

# Создайте .env файл
cp .env.example .env
# Отредактируйте .env и добавьте DATABASE_URL

# Frontend
cd frontend
npm install
```

### 2. Запуск разработки

**Терминал 1 - Backend:**
```bash
cd backend
python app.py
```
Backend запустится на http://localhost:5000

**Терминал 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend запустится на http://localhost:3000

### 3. Доступ к приложению

- **Главная страница:** http://localhost:3000
- **Админ-панель:** http://localhost:3000/admin
- **API документация:** http://localhost:5000

## Структура проекта

```
miracledenchir/
├── backend/               # Flask API
│   ├── app.py            # Главный файл приложения
│   ├── config.py         # Конфигурация
│   ├── models.py         # Модели базы данных
│   ├── routes.py         # API endpoints
│   ├── requirements.txt  # Python зависимости
│   └── .env.example      # Пример переменных окружения
│
├── frontend/             # React приложение
│   ├── public/           # Статические файлы
│   ├── src/
│   │   ├── components/   # Компоненты
│   │   ├── pages/        # Страницы
│   │   ├── utils/        # Утилиты (API)
│   │   ├── App.jsx       # Главный компонент
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Глобальные стили
│   ├── package.json      # Node зависимости
│   ├── vite.config.js    # Конфигурация Vite
│   └── tailwind.config.js # Конфигурация Tailwind
│
├── vercel.json           # Конфигурация Vercel
├── runtime.txt           # Python версия
└── README.md             # Документация
```

## Основные команды

### Backend
```bash
# Запуск
python app.py

# С автоперезагрузкой
FLASK_ENV=development python app.py
```

### Frontend
```bash
# Разработка
npm run dev

# Билд для продакшн
npm run build

# Превью билда
npm run preview
```

## Основные возможности

### ✨ Дизайн
- 🎨 Темная зеленая гамма
- 💎 Glassmorphism (стеклянный эффект)
- 🌫️ Blur эффекты
- ✨ Плавные анимации
- 💻 Terminal-стиль навигация

### 🚀 Функционал
- 📄 Многостраничное приложение (Home, About, Projects, Contact)
- 🔧 Полная админ-панель для управления контентом
- 🎯 Редактирование всех элементов через UI
- 📱 Адаптивный дизайн
- ⚡ Быстрая загрузка

### 🛠️ Технологии
- **Frontend:** React 18, Vite, TailwindCSS, Framer Motion
- **Backend:** Flask, SQLAlchemy, PostgreSQL
- **Deployment:** Vercel + Neon

## Использование админ-панели

1. Перейдите на `/admin`
2. Выберите нужный раздел (Content Blocks, Projects, About, Skills, Settings)
3. Нажмите "Add New" для создания нового элемента
4. Или нажмите на иконку редактирования для изменения существующего
5. Сохраните изменения

### Типы контента в админке:

**Content Blocks** - Текстовые блоки и кнопки на страницах
- `key` - уникальный идентификатор
- `type` - тип (text, button, heading)
- `content` - содержимое
- `page` - на какой странице отображается
- `order` - порядок отображения

**Projects** - Портфолио проектов
- Название, описание, ссылки
- Технологии (через запятую)
- Изображение (URL)
- Featured - показать на главной

**About Sections** - Секции страницы "Обо мне"
- Заголовок и контент
- Иконка (emoji)
- Порядок

**Skills** - Навыки и технологии
- Название и категория
- Уровень (0-100)
- Иконка

**Settings** - Глобальные настройки
- Email, социальные сети
- Мета-информация

## API Endpoints

### Content Blocks
- `GET /api/content-blocks` - Все блоки
- `GET /api/content-blocks?page=home` - Блоки страницы
- `POST /api/content-blocks` - Создать
- `PUT /api/content-blocks/:id` - Обновить
- `DELETE /api/content-blocks/:id` - Удалить

### Projects
- `GET /api/projects` - Все проекты
- `GET /api/projects?featured=true` - Только featured
- `POST /api/projects` - Создать
- `PUT /api/projects/:id` - Обновить
- `DELETE /api/projects/:id` - Удалить

### About Sections
- `GET /api/about-sections` - Все секции
- `POST /api/about-sections` - Создать
- `PUT /api/about-sections/:id` - Обновить
- `DELETE /api/about-sections/:id` - Удалить

### Skills
- `GET /api/skills` - Все навыки
- `GET /api/skills?category=Frontend` - По категории
- `POST /api/skills` - Создать
- `PUT /api/skills/:id` - Обновить
- `DELETE /api/skills/:id` - Удалить

### Settings
- `GET /api/settings` - Все настройки
- `POST /api/settings` - Создать/обновить

## Кастомизация

### Изменение цветовой схемы

Отредактируйте `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Ваши цвета здесь
  }
}
```

### Изменение анимаций

Отредактируйте `frontend/src/index.css` для кастомных классов анимаций.

### Добавление новых страниц

1. Создайте компонент в `frontend/src/pages/`
2. Добавьте роут в `frontend/src/App.jsx`
3. Добавьте в навигацию `frontend/src/components/TerminalNav.jsx`

## Troubleshooting

### Backend не запускается
```bash
# Проверьте установку зависимостей
pip list

# Проверьте .env файл
cat backend/.env
```

### Frontend не запускается
```bash
# Очистите кеш и переустановите
rm -rf node_modules package-lock.json
npm install
```

### База данных не создается
```bash
# Проверьте DATABASE_URL
# Для локальной разработки можно использовать SQLite (по умолчанию)
```

### CORS ошибки
```bash
# Убедитесь, что backend запущен на порту 5000
# Проверьте CORS_ORIGIN в .env
```

## Следующие шаги

1. ✅ Кастомизируйте контент через админ-панель
2. ✅ Добавьте свои проекты и информацию
3. ✅ Настройте социальные ссылки
4. ✅ Добавьте свои изображения
5. ✅ Деплойте на Vercel (см. DEPLOYMENT.md)

## Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера (F12)
2. Проверьте логи backend
3. Убедитесь, что все зависимости установлены
4. Проверьте переменные окружения

Удачи с вашим портфолио! 🚀

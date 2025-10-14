# 💎 Modern Portfolio Website

> Профессиональный портфолио-сайт с темным glassmorphism дизайном, terminal-навигацией и полной админ-панелью для управления контентом.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![React](https://img.shields.io/badge/react-18.2-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Особенности

- 🎨 **Темная зеленая гамма** с профессиональным glassmorphism дизайном
- 💻 **Terminal-стиль навигация** с командами в стиле bash
- ⚡ **Плавные анимации** везде с Framer Motion
- 🌫️ **Blur эффекты** и стеклянные карточки
- 🔧 **Полная админ-панель** для редактирования всего контента
- 📱 **Адаптивный дизайн** для всех устройств
- 🚀 **Готов к деплою** на Vercel с Neon PostgreSQL
- ⚙️ **REST API** для управления данными

## 🖼️ Демо

```bash
$ cd ~
$ ./start-portfolio
> Initializing system...
> Loading modules... [████████████████████] 100%
> System ready ✓
```

## 🛠️ Технологии

### Frontend
- **React 18** - Современная библиотека UI
- **Vite** - Быстрый build tool
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Анимации и переходы
- **React Router** - Клиентская маршрутизация
- **Axios** - HTTP клиент

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM для работы с БД
- **PostgreSQL** - База данных (Neon для продакшн)
- **Flask-CORS** - Cross-origin support
- **Gunicorn** - WSGI сервер

### Deployment
- **Vercel** - Frontend + Backend hosting
- **Neon** - Serverless PostgreSQL

## 🚀 Быстрый старт

### Автоматическая установка (Windows)

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd miracledenchir

# Запустите установщик
install.bat

# Запустите dev серверы
start-dev.bat
```

### Ручная установка

#### 1. Backend

```bash
cd backend
pip install -r requirements.txt

# Создайте .env файл
cp .env.example .env
# Отредактируйте .env и добавьте DATABASE_URL

# Запустите
python app.py
```

Backend запустится на `http://localhost:5000`

#### 2. Frontend

```bash
cd frontend
npm install

# Создайте .env файл (опционально)
cp .env.example .env

# Запустите
npm run dev
```

Frontend запустится на `http://localhost:3000`

## 📁 Структура проекта

```
miracledenchir/
│
├── 📂 backend/                 # Flask API
│   ├── app.py                 # Главное приложение
│   ├── config.py              # Конфигурация
│   ├── models.py              # Модели базы данных
│   ├── routes.py              # API endpoints
│   ├── requirements.txt       # Python зависимости
│   ├── .env.example           # Пример env файла
│   └── Procfile               # Для Railway/Heroku
│
├── 📂 frontend/               # React приложение
│   ├── 📂 public/             # Статические файлы
│   ├── 📂 src/
│   │   ├── 📂 components/     # React компоненты
│   │   │   ├── TerminalLoader.jsx
│   │   │   ├── TerminalNav.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   └── AnimatedSection.jsx
│   │   ├── 📂 pages/          # Страницы приложения
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Admin.jsx
│   │   ├── 📂 utils/          # Утилиты
│   │   │   └── api.js         # API клиент
│   │   ├── App.jsx            # Главный компонент
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Глобальные стили
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── 📄 vercel.json             # Конфигурация Vercel
├── 📄 runtime.txt             # Python версия
├── 📄 README.md               # Этот файл
├── 📄 QUICKSTART.md           # Быстрый старт
├── 📄 DEPLOYMENT.md           # Гайд по деплою
├── 📄 FEATURES.md             # Полный список фич
├── 📄 install.bat             # Установщик (Windows)
└── 📄 start-dev.bat           # Dev запуск (Windows)
```

## 📖 Документация

- **[QUICKSTART.md](QUICKSTART.md)** - Быстрое начало работы
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Подробный гайд по деплою на Vercel
- **[FEATURES.md](FEATURES.md)** - Полный список возможностей

## 🎯 Основные страницы

### 🏠 Главная (/)
- Hero секция с анимированным текстом
- Featured проекты
- Социальные ссылки
- CTA секция

### 👤 Обо мне (/about)
- Редактируемые секции информации
- Навыки с визуальными индикаторами
- Timeline карьеры

### 💼 Проекты (/projects)
- Все проекты с фильтрацией
- Карточки с изображениями
- Ссылки на GitHub и демо
- Технологии как теги

### 📧 Контакты (/contact)
- Контактная форма
- Email и социальные сети
- Информация о доступности

### ⚙️ Админ-панель (/admin)
- Управление всем контентом
- CRUD для всех сущностей
- Inline редактирование

## 🔧 Админ-панель

Доступ: `http://localhost:3000/admin`

### Что можно редактировать:

#### 📝 Content Blocks
Все текстовые блоки на страницах:
- Заголовки
- Описания
- Кнопки и их ссылки
- Любой текстовый контент

#### 💼 Projects
Управление проектами:
- Название и описание
- Изображения
- Ссылки (GitHub, Demo)
- Технологии
- Featured статус

#### 👤 About Sections
Секции страницы "Обо мне":
- Заголовки и контент
- Иконки
- Порядок отображения

#### 🎯 Skills
Навыки и технологии:
- Название
- Категория
- Уровень владения
- Иконка

#### ⚙️ Settings
Глобальные настройки:
- Название сайта
- Email
- Социальные ссылки
- Мета-информация

## 🎨 Дизайн

### Цветовая палитра

```css
/* Зеленые оттенки */
primary-500: #1a6049
primary-600: #22805e
primary-700: #2aa073
primary-800: #3bc588
primary-900: #4de89d

/* Темный фон */
dark-900: #030712
dark-800: #0a0f1e
dark-700: #111827
```

### Ключевые стили

- **Glass Effects**: Полупрозрачность + backdrop blur
- **Glow Effects**: Text shadows и box shadows
- **Terminal Font**: Моноширинный для команд
- **Smooth Animations**: Framer Motion transitions

## 🌐 API Endpoints

```
GET    /api/content-blocks          # Все блоки контента
GET    /api/content-blocks/:id      # Конкретный блок
POST   /api/content-blocks          # Создать блок
PUT    /api/content-blocks/:id      # Обновить блок
DELETE /api/content-blocks/:id      # Удалить блок

GET    /api/projects                # Все проекты
GET    /api/projects/:id            # Конкретный проект
POST   /api/projects                # Создать проект
PUT    /api/projects/:id            # Обновить проект
DELETE /api/projects/:id            # Удалить проект

GET    /api/about-sections          # Все секции
POST   /api/about-sections          # Создать секцию
PUT    /api/about-sections/:id      # Обновить секцию
DELETE /api/about-sections/:id      # Удалить секцию

GET    /api/skills                  # Все навыки
POST   /api/skills                  # Создать навык
PUT    /api/skills/:id              # Обновить навык
DELETE /api/skills/:id              # Удалить навык

GET    /api/settings                # Все настройки
POST   /api/settings                # Создать/обновить настройку

GET    /api/health                  # Health check
```

## 🚀 Деплой на Vercel

### Подготовка

1. Создайте аккаунт на [Neon](https://neon.tech) и получите DATABASE_URL
2. Создайте аккаунт на [Vercel](https://vercel.com)
3. Подключите GitHub репозиторий

### Переменные окружения в Vercel

```env
DATABASE_URL=postgresql://...neon.tech/dbname
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
CORS_ORIGIN=https://your-domain.vercel.app
VITE_API_URL=/api
```

### Команды деплоя

Vercel автоматически деплоит при push в main ветку.

Подробнее в [DEPLOYMENT.md](DEPLOYMENT.md)

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host/db
SECRET_KEY=your-secret-key
FLASK_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork проект
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Распространяется под лицензией MIT. Смотрите `LICENSE` для деталей.

## 🙏 Благодарности

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com/)
- [Neon](https://neon.tech/)

## 📞 Контакты

Ваше имя - [@yourusername](https://twitter.com/yourusername) - email@example.com

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

⭐️ Если проект понравился, поставьте звезду на GitHub!

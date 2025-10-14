# 🚀 Полная CMS система - Инструкция

## ✅ Что было создано

### Backend (3 новых файла):

1. **`models_settings.py`** - 3 новые модели БД:
   - `SiteSetting` - настройки сайта (hero, about, contact, social, seo, footer)
   - `PageContent` - контент страниц (любой текст на любой странице)
   - `ButtonConfig` - конфигурация кнопок (текст, URL, стиль)

2. **`routes_settings.py`** - API endpoints:
   - `/api/settings` - GET/POST для настроек
   - `/api/settings/<category>` - GET по категории
   - `/api/settings/bulk` - POST массовое обновление
   - `/api/content/<page>` - GET контент страницы
   - `/api/content/<page>/<section>` - GET контент секции
   - `/api/content` - POST создание/обновление
   - `/api/content/bulk` - POST массовое обновление
   - `/api/buttons/<page>` - GET кнопки страницы
   - `/api/buttons` - POST создание/обновление кнопки
   - `/api/settings/init` - POST инициализация дефолтных настроек

3. **`app.py`** - обновлен для подключения новых роутов

---

## 🗄️ Структура БД

### Таблица: `site_settings`
```sql
- id (PK)
- key (unique) - уникальный ключ (hero_title, contact_email, etc)
- value - значение
- category - категория (hero, about, contact, social, seo, footer)
- label - читаемое название
- field_type - тип поля (text, textarea, url, email)
- created_at, updated_at
```

### Таблица: `page_content`
```sql
- id (PK)
- page - страница (home, about, projects, blog, resume, contact)
- section - секция (hero, features, testimonials, etc)
- key - ключ контента
- value - значение
- order - порядок отображения
- created_at, updated_at
```

### Таблица: `button_configs`
```sql
- id (PK)
- page - страница
- button_id - уникальный ID кнопки
- text - текст кнопки
- url - ссылка
- style - стиль (primary, secondary, outline)
- icon - иконка
- visible - видимость
- order - порядок
- created_at, updated_at
```

---

## 🚀 Как использовать

### 1. Инициализация БД

```bash
# В терминале backend
python
>>> from app import create_app, db
>>> from models_settings import SiteSetting, PageContent, ButtonConfig
>>> app = create_app()
>>> with app.app_context():
...     db.create_all()
...     print("Tables created!")
```

### 2. Инициализация дефолтных настроек

```bash
# POST запрос
curl -X POST http://localhost:5000/api/settings/init
```

Или через админку:
- Добавить кнопку "Initialize Settings" в Settings табе

### 3. API Примеры

#### Получить все настройки:
```javascript
fetch('/api/settings')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Обновить настройку:
```javascript
fetch('/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: 'hero_title',
    value: 'New Title',
    category: 'hero',
    label: 'Main Title',
    field_type: 'text'
  })
});
```

#### Массовое обновление:
```javascript
fetch('/api/settings/bulk', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify([
    { key: 'hero_title', value: 'New Title' },
    { key: 'hero_subtitle', value: 'New Subtitle' }
  ])
});
```

---

## 📝 Что можно редактировать

### Hero Section (Главная страница)
- ✅ hero_title - Заголовок
- ✅ hero_subtitle - Подзаголовок
- ✅ hero_description - Описание

### About Section
- ✅ about_title - Заголовок
- ✅ about_description - Описание

### Contact Information
- ✅ contact_email - Email
- ✅ contact_phone - Телефон
- ✅ contact_location - Локация

### Social Links
- ✅ social_github - GitHub URL
- ✅ social_linkedin - LinkedIn URL
- ✅ social_twitter - Twitter URL

### SEO Settings
- ✅ seo_title - Title сайта
- ✅ seo_description - Description
- ✅ seo_keywords - Keywords

### Footer
- ✅ footer_text - Текст футера

### Кнопки (любая страница)
- ✅ Текст кнопки
- ✅ URL кнопки
- ✅ Стиль (primary/secondary/outline)
- ✅ Иконка
- ✅ Видимость
- ✅ Порядок

---

## 🔧 Frontend Integration

### Обновите `SiteSettings.jsx`:

```javascript
const handleSave = async () => {
  setSaving(true);
  try {
    // Преобразуем settings в массив для bulk update
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));
    
    const response = await fetch('http://localhost:5000/api/settings/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    
    if (response.ok) {
      showToast('Settings saved successfully!', 'success');
    }
  } catch (error) {
    showToast('Error saving settings', 'error');
  } finally {
    setSaving(false);
  }
};
```

### Загрузка настроек:

```javascript
useEffect(() => {
  const loadSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/settings');
      const data = await response.json();
      
      // Преобразуем в плоский объект
      const flatSettings = {};
      Object.values(data).flat().forEach(setting => {
        flatSettings[setting.key] = setting.value;
      });
      
      setSettings(flatSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };
  
  loadSettings();
}, []);
```

---

## 🎯 Использование в компонентах

### Home.jsx:

```javascript
import { useState, useEffect } from 'react';

const Home = () => {
  const [content, setContent] = useState({});
  
  useEffect(() => {
    fetch('/api/settings/hero')
      .then(res => res.json())
      .then(data => {
        const contentObj = {};
        data.forEach(item => {
          contentObj[item.key] = item.value;
        });
        setContent(contentObj);
      });
  }, []);
  
  return (
    <div>
      <h1>{content.hero_title || 'Default Title'}</h1>
      <h2>{content.hero_subtitle || 'Default Subtitle'}</h2>
      <p>{content.hero_description || 'Default Description'}</p>
    </div>
  );
};
```

---

## 🚀 Деплой на Vercel

### 1. Обновите `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/app.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/app.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url"
  }
}
```

### 2. Environment Variables в Vercel:

```
DATABASE_URL=your-neon-postgres-url
FLASK_ENV=production
SECRET_KEY=your-secret-key
CORS_ORIGINS=https://yourdomain.vercel.app
```

### 3. Requirements.txt:

```
Flask==2.3.0
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.5
psycopg2-binary==2.9.6
python-dotenv==1.0.0
gunicorn==21.2.0
```

---

## 📊 Админка - Новые возможности

### Settings Tab:
- ✅ Редактирование всех текстов
- ✅ Группировка по категориям
- ✅ Сохранение в БД
- ✅ Bulk update

### Content Tab (новый):
- ✅ Управление контентом по страницам
- ✅ Управление секциями
- ✅ Порядок элементов

### Buttons Tab (новый):
- ✅ Управление кнопками
- ✅ Настройка стилей
- ✅ URL и иконки

---

## 🔥 Быстрый старт

### 1. Создайте таблицы:
```bash
cd backend
python
>>> from app import create_app, db
>>> app = create_app()
>>> with app.app_context():
...     db.create_all()
```

### 2. Инициализируйте данные:
```bash
curl -X POST http://localhost:5000/api/settings/init
```

### 3. Откройте админку:
```
http://localhost:5173/admin
```

### 4. Перейдите на Settings и редактируйте!

---

## ✅ Готово!

Теперь у вас полноценная CMS система:
- ✅ Редактирование ВСЕХ текстов
- ✅ Управление кнопками
- ✅ Сохранение в PostgreSQL
- ✅ Работает на Vercel
- ✅ API для всего

**Все изменения сохраняются в БД и доступны после перезагрузки! 🎉**

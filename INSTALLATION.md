# 📦 Installation Guide

## Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL (or Neon account)

---

## 🚀 Quick Start

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Install Additional Packages

```bash
# Core dependencies (if not already installed)
npm install react-router-dom framer-motion react-icons

# SEO & PWA
npm install react-helmet-async

# Forms & Validation
npm install react-hook-form yup @hookform/resolvers

# Charts (for admin dashboard)
npm install recharts

# Utilities
npm install date-fns clsx

# Development
npm install -D @types/react @types/react-dom
```

### 3. Install Backend Dependencies

```bash
cd ../backend
pip install -r requirements.txt

# Or install individually:
pip install flask flask-cors flask-sqlalchemy psycopg2-binary python-dotenv
```

---

## 🔧 Configuration

### Frontend (.env)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_USERNAME=your-github-username
```

### Backend (.env)

Create `backend/.env`:

```env
DATABASE_URL=your-postgresql-url
FLASK_ENV=development
SECRET_KEY=your-secret-key
```

---

## 🎨 New Features Installed

### ✨ Design & Animations
- ✅ **CursorTrail** - Светящийся след за курсором
- ✅ **MagneticButton** - Магнитные кнопки
- ✅ **TiltCard** - 3D эффект наклона карточек
- ✅ **AnimatedGrid** - Анимированная сетка на фоне
- ✅ **NoiseTexture** - Текстура шума для глубины

### ⚙️ Functionality
- ✅ **CommandPalette** - Ctrl+K поиск и навигация
- ✅ **ThemeToggle** - Переключатель темной/светлой темы
- ✅ **ScrollProgress** - Индикатор прогресса скролла
- ✅ **ImageLightbox** - Полноэкранный просмотр изображений
- ✅ **LiveSearch** - Живой поиск по сайту
- ✅ **Breadcrumbs** - Хлебные крошки навигации

### 📄 New Pages
- ✅ **Blog** - Страница блога с фильтрацией
- ✅ **Resume** - Страница резюме
- ✅ **NotFound** - Красивая 404 страница

### 🛠️ Components
- ✅ **LoadingSkeleton** - Скелетоны загрузки
- ✅ **ErrorBoundary** - Обработка ошибок
- ✅ **SEO** - Meta теги для SEO
- ✅ **GitHubContributions** - График активности GitHub
- ✅ **AdminDashboard** - Дашборд админки

### 🔍 SEO & PWA
- ✅ **manifest.json** - PWA манифест
- ✅ **service-worker.js** - Service Worker для оффлайн
- ✅ **robots.txt** - Файл для поисковых роботов
- ✅ **sitemap.xml** - Карта сайта

---

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
python app.py
```

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
gunicorn app:app
```

---

## 📝 Usage Examples

### Using Components

#### CursorTrail
```jsx
import CursorTrail from './components/CursorTrail';

function App() {
  return (
    <>
      <CursorTrail />
      {/* Your content */}
    </>
  );
}
```

#### CommandPalette
```jsx
import CommandPalette from './components/CommandPalette';

// Automatically opens with Ctrl+K or Cmd+K
<CommandPalette />
```

#### ThemeToggle
```jsx
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* Your content */}
    </ThemeProvider>
  );
}
```

#### ImageLightbox
```jsx
import ImageLightbox from './components/ImageLightbox';

const [lightboxOpen, setLightboxOpen] = useState(false);
const [images] = useState(['image1.jpg', 'image2.jpg']);

<ImageLightbox
  images={images}
  currentIndex={0}
  isOpen={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
  onNext={() => {}}
  onPrev={() => {}}
/>
```

#### SEO Component
```jsx
import SEO from './components/SEO';

<SEO
  title="My Page Title"
  description="Page description"
  keywords="react, portfolio, web development"
/>
```

---

## 🎯 Features Checklist

### Completed ✅
- [x] Cursor Trail Effect
- [x] Magnetic Buttons
- [x] 3D Card Tilt
- [x] Animated Grid Background
- [x] Noise Texture
- [x] Dark/Light Mode Toggle
- [x] Command Palette (Ctrl+K)
- [x] Image Lightbox
- [x] Scroll Progress Bar
- [x] Loading Skeletons
- [x] 404 Error Page
- [x] Blog Page
- [x] Resume Page
- [x] GitHub Contributions Graph
- [x] SEO Components
- [x] PWA Support
- [x] Error Boundary
- [x] Breadcrumbs
- [x] Live Search
- [x] Admin Dashboard

### Pending 🔄
- [ ] Rich Text Editor (TipTap)
- [ ] Image Upload & Crop
- [ ] Drag & Drop Reordering
- [ ] Email Integration (SendGrid)
- [ ] GitHub API Integration
- [ ] Analytics Integration
- [ ] Auto-save Drafts
- [ ] Version History

---

## 🐛 Troubleshooting

### Common Issues

**1. Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. Port already in use**
```bash
# Frontend (default 5173)
# Change in vite.config.js

# Backend (default 5000)
# Change in app.py or use:
flask run --port 5001
```

**3. Database connection errors**
```bash
# Check your DATABASE_URL in .env
# Make sure PostgreSQL is running
```

**4. Build errors**
```bash
# Check for TypeScript errors
npm run type-check

# Clear build cache
rm -rf dist
npm run build
```

---

## 📚 Documentation

- **React**: https://react.dev
- **Framer Motion**: https://www.framer.com/motion
- **TailwindCSS**: https://tailwindcss.com
- **Flask**: https://flask.palletsprojects.com
- **Vite**: https://vitejs.dev

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - feel free to use this project for your portfolio!

---

## 🎉 Next Steps

1. **Customize Content**: Update all placeholder text and images
2. **Add Real Data**: Connect to your actual backend API
3. **Deploy**: Deploy to Vercel (frontend) and your preferred backend host
4. **SEO**: Update sitemap.xml and robots.txt with your domain
5. **Analytics**: Add Google Analytics or similar
6. **Testing**: Write tests for critical components

---

**Happy Coding! 🚀**

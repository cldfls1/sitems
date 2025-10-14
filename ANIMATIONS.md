# 🎬 Все анимации в проекте

## ✨ Реализовано КУЧА анимаций!

### 1. **Loading Spinner**
- Вращающийся круг с прозрачной границей
- `animate={{ rotate: 360 }}`
- Бесконечное вращение

### 2. **Фоновые элементы (Background Blobs)**
- 2 огромных круга с градиентом
- Одновременно: scale, rotate, opacity
- Разные скорости (20s и 15s)
- Создают живой ambient эффект

### 3. **Hero Badge**
- Fade in + slide up
- Вращающаяся иконка молнии внутри
- `animate={{ rotate: 360 }}` - 2s бесконечно

### 4. **Заголовок (H1)**
- Staggered появление
- WhileHover: scale 1.05 с spring эффектом
- Градиентная анимация фона для подзаголовка
- `backgroundPosition` анимация - 5s loop

### 5. **CTA Кнопки**
- Scale на hover (1.05)
- Scale на tap (0.95)
- Анимированная стрелка - движется влево-вправо
- `animate={{ x: [0, 5, 0] }}` - 1.5s infinite

### 6. **Социальные иконки**
- WhileHover: scale 1.2 + rotate 5deg
- WhileTap: scale 0.9
- Staggered появление (delay: 0.8 + i * 0.1)
- Hover меняет цвет на primary-500

### 7. **Параллакс эффекты**
- `useScroll()` + `useTransform()`
- y1: [0, 100] - карточка движется вниз при скролле
- y2: [0, -50] - проекты движутся вверх
- opacity: fade out hero при скролле

### 8. **Feature Card**
- Fade in + slide up при появлении в viewport
- Glow эффект на hover (gradient overlay)
- Floating элементы по углам:
  - Движутся вверх-вниз (y: [0, -10, 0])
  - Вращаются (rotate: [0, 5, 0])
  - Разные скорости (3s и 4s)

### 9. **Код Preview**
- Typing эффект - каждая строка печатается
- `animate={{ width: "100%" }}`
- Staggered delays (0.5s, 0.7s, 0.9s, 1.1s)
- Overflow hidden для эффекта печати

### 10. **Tech Tags**
- WhileHover: scale 1.1 + translateY -2px
- Меняет border и color на hover
- Smooth transitions

### 11. **Project Cards**
- Fade in + slide up при viewport
- Staggered delays (i * 0.1)
- WhileHover: translateY -5px + scale 1.02
- Вращающаяся звезда для featured проектов
- `animate={{ rotate: [0, 360] }}` - 2s loop

### 12. **Navigation (TopNav)**
- Slide down from top: initial y: -100
- Staggered nav items (delay: i * 0.1)
- Logo rotate на hover (360deg за 0.6s)
- Scale на hover для Admin button
- Mobile menu: height auto animation

### 13. **Modal**
- Backdrop fade in
- Modal: scale + fade + translateY
- `initial={{ opacity: 0, scale: 0.95, y: 20 }}`
- Smooth enter/exit

### 14. **Toast**
- Slide down from top + fade
- `initial={{ y: -50, x: '-50%' }}`
- Auto dismiss после 3s

### 15. **Admin Cards**
- Fade in + slide up
- Initial: opacity 0, y 10
- Edit/Delete buttons hover: scale

## 🎯 Типы анимаций

### Timing-based
- **Rotate**: 360deg infinite
- **Float**: y движение вверх-вниз
- **Pulse**: opacity fade in/out
- **Typing**: width 0 → 100%

### Scroll-based
- **Parallax**: разные скорости для слоев
- **Fade on scroll**: opacity transform
- **Reveal on scroll**: whileInView

### Interaction-based
- **Hover**: scale, rotate, translateY
- **Tap**: scale down (0.9-0.95)
- **Focus**: border color transitions

### Staggered
- **Children**: delay based on index
- **Sequential**: один за другим
- **Cascade**: волна анимации

## ⚙️ Настройки анимаций

### Durations
- Quick: 0.3s (hover, tap)
- Normal: 0.5-0.8s (появление)
- Slow: 1-2s (амбиент)
- Very slow: 15-20s (фоновые круги)

### Easing
- `ease-out`: для появления
- `ease-in-out`: для циклов
- `linear`: для вращения
- `spring`: для интерактивных (stiffness: 300)

### Delays
- Staggered: 0.1s между элементами
- Sequential: 0.2-0.3s между секциями
- Long: 0.5-1s для драматичности

## 🔥 Крутые фишки

### 1. Градиентная анимация текста
```jsx
animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
```

### 2. Параллакс с Framer Motion
```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 300], [0, 100]);
<motion.div style={{ y }}>
```

### 3. Typing эффект
```jsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: "100%" }}
  className="overflow-hidden"
>
```

### 4. Floating элементы
```jsx
animate={{ 
  y: [0, -10, 0], 
  rotate: [0, 5, 0] 
}}
transition={{ duration: 3, repeat: Infinity }}
```

### 5. Viewport triggers
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

### 6. Staggered children
```jsx
{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: i * 0.1 }}
  >
))}
```

### 7. Interactive states
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## 📊 Статистика анимаций

- **Всего анимированных элементов:** 50+
- **Типов анимаций:** 15+
- **Parallax слоев:** 3
- **Floating элементов:** 4
- **Rotating элементов:** 5
- **Staggered групп:** 8
- **WhileInView триггеров:** 15+
- **Hover эффектов:** 20+

## 🎨 Performance

### Оптимизации
- `viewport={{ once: true }}` - анимация 1 раз
- CSS transforms (не layout properties)
- Will-change для GPU acceleration
- Reduce motion для accessibility

### Smooth 60fps
- Hardware accelerated transforms
- No layout thrashing
- Optimized rerenders
- GPU compositing

## 🚀 Результат

Сайт живой и динамичный! Каждый элемент имеет свою анимацию:
- Плавные переходы
- Интерактивные реакции
- Визуальный feedback
- Профессиональный вид

**Анимации делают UX невероятным!** ✨

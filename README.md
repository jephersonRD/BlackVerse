# 🎮 Blackverse | Blockverse - Gaming PC Landing Page

> Landing page oficial de **Blackverse** (también conocido como **Blockverse**) - Líder en PCs gaming de alta gama y soluciones GPU Cloud. Construida con HTML puro, CSS avanzado y JavaScript vanilla para máximo rendimiento.

[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

![Preview](https://img.shields.io/badge/Estado-Producción-success?style=for-the-badge)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue?style=for-the-badge)

---

## 🌟 Sobre Blackverse | Blockverse

**Blackverse** (también conocido como **Blockverse**) es la marca premium líder en:
- 🖥️ **PCs Gaming de Alto Rendimiento** - Configuraciones con NVIDIA RTX 4090
- ☁️ **GPU Cloud Computing** - Soluciones de computación en la nube
- 🎮 **Gaming Profesional** - Equipos para streamers y gamers profesionales
- 💻 **Workstations Premium** - Para creadores de contenido y desarrolladores

---

## ✨ Características Principales

### 🎨 **Diseño Moderno Bento UI**
- Layout tipo Bento Grid responsive y fluido
- Sistema de diseño consistente con variables CSS
- Tema oscuro optimizado para gaming
- Glassmorphism y efectos de profundidad

### 🎭 **Animaciones de Alto Nivel**
- **Scroll Animations**: Elementos animados al hacer scroll
- **Stagger Effects**: Animaciones escalonadas para grupos de elementos
- **Hover Interactions**: Efectos 3D tilt y glow en tarjetas
- **Micro-interactions**: Detalles sutiles que mejoran la UX
- **Performance**: Animaciones optimizadas con `will-change` y `transform`

### 🛒 **Sistema de Pedidos**
- Formulario de pedidos con validación en tiempo real
- Vista de resumen de pedidos pendientes
- Estados visuales: Pendiente, Listo, Entregado
- Almacenamiento local de pedidos

### 📱 **Totalmente Responsive**
- Diseño mobile-first
- Breakpoints optimizados para todos los dispositivos
- Grid adaptativo que se ajusta automáticamente
- Imágenes y tipografía fluidas con `clamp()`

### ♿ **Accesibilidad**
- Soporte para `prefers-reduced-motion`
- Navegación por teclado optimizada
- Estados de foco visibles y claros
- Estructura semántica HTML5

---

## 🚀 Demo en Vivo

🔗 **[Ver Demo](https://blackverse.com)** | 🛒 **[Hacer Pedido](https://blackverse.com/order.html)**

**Keywords de búsqueda:** Blackverse, Blockverse, PC Gaming, RTX 4090, GPU Cloud

---

## 📸 Capturas de Pantalla

<details>
<summary>Ver capturas</summary>

### Página Principal
![Hero Section](assets/img/screenshot-hero.png)

### Sección de Productos
![Products](assets/img/screenshot-products.png)

### Sistema de Pedidos
![Orders](assets/img/screenshot-orders.png)

</details>

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **HTML5** | Estructura semántica y marcado |
| **CSS3** | Estilos, animaciones y layout |
| **JavaScript ES6+** | Interactividad y lógica |
| **CSS Grid & Flexbox** | Sistema de layout responsive |
| **Intersection Observer API** | Animaciones al hacer scroll |
| **LocalStorage API** | Persistencia de datos |

---

## 📂 Estructura del Proyecto

```
web/
├── index.html              # Página principal
├── order.html              # Página de pedidos
├── assets/
│   ├── css/
│   │   ├── theme.css       # Variables y componentes base
│   │   ├── bento.css       # Sistema Bento Grid
│   │   └── animations.css  # Animaciones avanzadas
│   ├── js/
│   │   └── ui.js          # Lógica de interacción
│   └── img/
│       ├── 4090.png
│       ├── gaming.png
│       ├── global.png
│       ├── precio.png
│       ├── ram.png
│       ├── redimiento.png
│       └── setup.png
└── README.md              # Este archivo
```

---

## 🎯 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

### Opción 1: Clonar y Ejecutar
```bash
# Clonar el repositorio
git clone https://github.com/blackverse/blackverse-landing.git

# Navegar al directorio
cd blackverse-landing

# Abrir con un servidor local (ejemplo con Python)
python -m http.server 8000

# O con Node.js
npx serve
```

Luego abre tu navegador en `http://localhost:8000`

### Opción 2: Abrir Directamente
Simplemente abre el archivo `index.html` en tu navegador favorito.

---

## 🎨 Personalización

### Cambiar Colores del Tema
Edita las variables CSS en `assets/css/theme.css`:

```css
:root {
  --violet: #7c3aed;      /* Color principal */
  --violet-600: #6d28d9;  /* Color hover */
  --violet-700: #5b21b6;  /* Color activo */
  --black: #0b0b0f;       /* Fondo oscuro */
  --white: #ffffff;       /* Texto claro */
}
```

### Modificar Animaciones
Las animaciones se encuentran en `assets/css/animations.css`. Puedes ajustar:
- **Duración**: Cambia los valores en `animation-duration`
- **Timing**: Modifica las funciones `cubic-bezier()`
- **Delays**: Ajusta los `animation-delay` para efectos stagger

### Agregar Nuevos Productos
En `index.html`, duplica y modifica cualquier `.bento-item`:

```html
<div class="bento-item medium enhanced anim-in">
  <div class="bento-icon">🎮</div>
  <h3 class="bento-title">Tu Producto</h3>
  <p class="bento-desc">Descripción aquí</p>
</div>
```

---

## 🧩 Componentes Clave

### Bento Grid System
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
```

### Sistema de Animaciones
```javascript
// Intersection Observer para animaciones al scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });
```

### Efectos Hover 3D
```javascript
// Tilt 3D en tarjetas
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
  card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
});
```

---

## 🌟 Características Destacadas

### ⚡ Rendimiento
- **CSS puro**: Sin frameworks pesados
- **Lazy Loading**: Imágenes y animaciones optimizadas
- **Hardware Acceleration**: Uso de `transform` y `opacity`
- **Minificación**: Archivos optimizados para producción

### 🎨 Diseño
- **Paleta coherente**: Sistema de colores bien definido
- **Tipografía fluida**: Uso de `clamp()` para escalado perfecto
- **Espaciado consistente**: Variables CSS reutilizables
- **Dark Mode**: Optimizado para la vista

### 🔧 Código Limpio
- **Modular**: CSS y JS organizados por funcionalidad
- **Comentado**: Código documentado y comprensible
- **Estándares**: Siguiendo las mejores prácticas web
- **Mantenible**: Fácil de actualizar y extender

---

## 📱 Compatibilidad

| Navegador | Versión Mínima | Estado |
|-----------|----------------|--------|
| Chrome    | 90+            | ✅ Completo |
| Firefox   | 88+            | ✅ Completo |
| Safari    | 14+            | ✅ Completo |
| Edge      | 90+            | ✅ Completo |
| Opera     | 76+            | ✅ Completo |

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva característica increíble'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución
- Mantén el código limpio y comentado
- Sigue las convenciones de nombres existentes
- Prueba en múltiples navegadores
- Actualiza la documentación si es necesario

---

## 📋 Roadmap

- [ ] Modo claro/oscuro toggle
- [ ] Integración con API de pagos
- [ ] Sistema de comparación de productos
- [ ] Carrito de compras completo
- [ ] Panel de administración
- [ ] Soporte multiidioma (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados

---

## 🐛 Reportar Bugs

¿Encontraste un bug? Por favor abre un [issue](https://github.com/blackverse/blackverse-landing/issues) con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Capturas de pantalla si es posible
- Navegador y versión

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 Blackverse (Blockverse)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Equipo Blackverse | Blockverse

**Blackverse Team**

- 🌐 Website: [blackverse.com](https://blackverse.com)
- 📧 Email: contact@blackverse.com
- 🐦 Twitter: [@blackverse](https://twitter.com/blackverse)
- 📸 Instagram: [@blackverse](https://instagram.com/blackverse)
- 💼 LinkedIn: [Blackverse](https://linkedin.com/company/blackverse)

---

## 🙏 Agradecimientos

- Inspiración de diseño: [Bento Grids](https://bentogrids.com/)
- Íconos y recursos visuales
- Comunidad de desarrolladores web

---

## 📚 Recursos Adicionales

- [Documentación CSS Grid](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout)
- [Intersection Observer API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)
- [Web Animations API](https://developer.mozilla.org/es/docs/Web/API/Web_Animations_API)
- [Guía de Accesibilidad Web](https://www.w3.org/WAI/WCAG21/quickref/)

---

<div align="center">

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub ⭐**

Hecho con 💜 y mucho ☕

</div>

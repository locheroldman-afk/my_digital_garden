# Quartz 4 - 极简手绘风格主题实现指南

## 📋 概述

这套主题提供了：

- ✅ 流畅的明暗模式切换动画（0.6s 柔和过渡）
- ✅ 极简主义 + 手绘风格的完整 UI
- ✅ 响应式设计（桌面 / 平板 / 手机）
- ✅ 无障碍支持（高对比度、减少动画）
- ✅ 可直接集成到 Quartz 4

---

## 🎨 视觉特性

### 明暗模式动画

- **过渡时间**：0.6s（柔和自然）
- **缓动函数**：`cubic-bezier(0.4, 0, 0.2, 1)`（Material Design 标准）
- **应用范围**：背景、文字、边框、阴影、滤镜都平滑过渡

### 手绘风格元素

- **线条**：1.5px 铅笔灰（亮模式 `#5A5550` / 暗模式 `#C9B5A0`）
- **按钮**：线框风 + 手绘感边框
- **分隔线**：虚线效果
- **便签框**：轻微旋转 + 贴纸感阴影
- **下划线**：渐变淡出或虚线效果

### 颜色系统

**亮模式（纸张风暖白）**
| 用途 | 颜色 | HEX |
|------|------|-----|
| 背景 | 纯白 | `#FFFFFF` |
| 表面 | 象牙白 | `#FAFAF8` |
| 边框 | 浅灰 | `#E8E6E1` |
| 正文 | 墨黑 | `#2B2620` |
| 辅文 | 灰色 | `#9A9691` |
| 线条 | 铅笔灰 | `#5A5550` |
| 点睛 | 灰蓝 | `#8BA5C2` |

**暗模式（深沉柔和）**
| 用途 | 颜色 | HEX |
|------|------|-----|
| 背景 | 深黑 | `#0F0D0A` |
| 表面 | 深棕 | `#1A1715` |
| 边框 | 深灰 | `#3A3530` |
| 正文 | 温白 | `#F5F1E8` |
| 辅文 | 中灰 | `#8A8178` |
| 线条 | 暖灰 | `#C9B5A0` |
| 点睛 | 灰蓝 | `#8BA5C2` |

---

## 📂 文件结构

```
publish/quartz/styles/
├── base.scss              ← Quartz 基础样式（无需改）
├── handdrawn.scss         ← 手绘风格基础库（已存在）
├── custom.scss            ← 原有自定义样式（保留）
└── theme-transition.scss  ← 新增：完整主题系统（本文件）
```

---

## 🔧 集成步骤

### 第一步：导入样式

在 Quartz 的主样式文件中（通常是 `index.scss` 或 `base.scss` 的末尾）添加：

```scss
/* 导入新的主题系统 */
@import "./theme-transition.scss";
```

或者，如果你使用自定义的加载顺序，确保导入顺序是：

```scss
@import "./base.scss"; // Quartz 基础
@import "./handdrawn.scss"; // 手绘风格库
@import "./custom.scss"; // 你的自定义样式
@import "./theme-transition.scss"; // 主题切换系统（最后导入，优先级最高）
```

### 第二步：启用主题切换

在 Quartz 的 JavaScript 中，确保有暗黑模式切换脚本。这通常已内置，但需要确保 `body` 标签会根据主题添加 `dark` class。

检查 Quartz 的暗黑模式脚本（通常在 `quartz/components/Darkmode.tsx` 或 JavaScript 文件中）：

```typescript
// 伪代码示例
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark")
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light")
})
```

如果 Quartz 没有此功能，你可以添加一个简单的脚本：

**文件**：`quartz/static/theme-toggle.js`

```javascript
// 主题切换脚本
;(function () {
  const toggleButton = document.querySelector(".theme-toggle")
  const isDark =
    localStorage.getItem("theme") === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches

  if (isDark) {
    document.body.classList.add("dark")
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      const isDarkNow = document.body.classList.contains("dark")
      localStorage.setItem("theme", isDarkNow ? "dark" : "light")
    })
  }

  // 监听系统主题变化
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (e.matches) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  })
})()
```

### 第三步：更新主题切换按钮（可选）

如果你想要自定义主题按钮的样式，可以在 Quartz 的导航组件中添加：

**文件**：`quartz/components/Darkmode.tsx`（如果存在）

或在 HTML 中添加：

```html
<button class="theme-toggle" aria-label="Toggle dark mode">
  <!-- 太阳图标 -->
  <svg
    class="sun-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
  <!-- 月亮图标 -->
  <svg
    class="moon-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
</button>
```

---

## 🎯 SCSS 代码说明

### 核心变量块

```scss
:root {
  /* 亮模式颜色变量 */
  --light-bg: #ffffff; /* 主背景 */
  --light-surface: #fafaf8; /* 卡片/表面 */
  --light-border: #e8e6e1; /* 边框 */
  --light-text: #2b2620; /* 正文 */

  /* 暗模式颜色变量 */
  --dark-bg: #0f0d0a;
  --dark-surface: #1a1715;
  /* ... */

  /* 统一过渡定义 */
  --theme-transition: background-color 0.6s, color 0.6s, /* ... */;
}
```

**作用**：集中管理所有颜色，便于快速调整。

### 明暗模式切换

```scss
body {
  background-color: var(--light-bg);
  transition: var(--theme-transition);
}

body.dark {
  background-color: var(--dark-bg);
}
```

**作用**：通过 `body.dark` class 实现无缝切换。所有子元素使用 CSS 变量，自动适配。

### 手绘风格示例

```scss
/* Logo 轻微旋转 */
.logo {
  transform: rotate(-0.5deg);
}

.logo:hover {
  transform: rotate(0deg) scale(1.05);
}

/* 链接虚线下划线 */
a {
  border-bottom: 1px dashed var(--light-accent);
}

/* 便签风格容器 */
.note-box {
  border: 2px dashed var(--light-pencil);
  transform: rotate(-0.5deg);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05);
}
```

---

## 🎬 动画细节

### 1. 主题切换动画

```scss
.theme-toggle .sun-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

body.dark .theme-toggle .sun-icon {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
```

**效果**：太阳图标旋转 90° 并缩小，月亮图标旋转进入。耗时 0.6s。

### 2. 导航链接动画

```scss
nav a {
  background-image: linear-gradient(90deg, var(--light-accent), var(--light-accent));
  background-size: 0 2px;
  transition: background-size 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

nav a:hover {
  background-size: 100% 2px;
}
```

**效果**：下划线从左到右逐渐显现，有弹性感。

### 3. 按钮 Hover 动画

```scss
button:hover {
  background-color: var(--light-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 165, 194, 0.2);
}
```

**效果**：轻微上跳 + 阴影增加，低调而自然。

### 4. 图片在暗黑模式的过渡

```scss
body.dark img {
  filter: brightness(0.85) contrast(1.1);
}
```

**效果**：自动调暗图片亮度，避免在暗背景上过亮。

---

## 📱 响应式断点

| 断点            | 设备   | 调整             |
| --------------- | ------ | ---------------- |
| ≥ 1024px        | 桌面   | 完整布局         |
| 768px ～ 1023px | 平板   | 侧栏改为相对定位 |
| < 768px         | 手机   | 单列布局         |
| < 480px         | 小手机 | 字号缩小         |

---

## ♿ 无障碍支持

### 高对比度模式

```scss
@media (prefers-contrast: more) {
  :root {
    --light-text: #000000; /* 更深 */
    --dark-text: #ffffff; /* 更亮 */
  }
}
```

### 减少动画模式

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

对于视障用户或设备性能受限用户，这些模式自动禁用非必要的动画。

---

## 🖼️ 手绘风格 SVG 图标建议

### 太阳图标（亮模式）

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>
```

### 月亮图标（暗模式）

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>
```

### 手绘线条铅笔图标（可选）

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M12 3 L20 11 L5 26 L-3 18 Z" stroke-linejoin="round"/>
  <circle cx="20" cy="11" r="2" fill="currentColor"/>
</svg>
```

---

## 🔍 调试与自定义

### 如何改变点睛色？

找到这一行：

```scss
--light-accent: #8ba5c2; /* 灰蓝 */
```

改为你喜欢的颜色，例如：

```scss
--light-accent: #a5bfb0; /* 淡灰绿 */
```

所有使用 `var(--light-accent)` 的元素都会自动更新。

### 如何调整过渡速度？

修改：

```scss
--theme-transition: background-color 0.6s, /* ... */;
```

改为：

```scss
--theme-transition: background-color 0.4s, /* ... */ /* 更快 */;
```

### 如何关闭图片在暗黑模式的滤镜？

找到：

```scss
body.dark img {
  filter: brightness(0.85) contrast(1.1);
}
```

改为：

```scss
body.dark img {
  filter: none;
}
```

---

## ✨ 效果清单

部署前检查：

- [ ] 亮模式正常显示（纯白背景 + 墨黑文字）
- [ ] 点击主题按钮后暗模式平滑过渡（0.6s 内完成）
- [ ] 所有文本在暗模式下易读
- [ ] 图片在暗模式自动调暗
- [ ] 按钮和链接 Hover 效果正常
- [ ] 响应式设计在手机上测试通过
- [ ] 减少动画模式下动画被禁用

---

## 🚀 性能优化

此主题已优化：

- **GPU 加速**：使用 `transform` 而非 `position` 改变
- **合成层**：必要时自动创建合成层
- **回流/重排最小化**：预先计算样式

---

## 📞 常见问题

**Q：暗黑模式切换很卡怎么办？**
A：确保 `--theme-transition` 只应用于必要的属性。如果有太多元素，考虑使用 `will-change` 优化。

**Q：可以自定义过渡时间吗？**
A：可以。改变 `0.6s` 为你想要的时间（建议 0.4s ～ 0.8s）。

**Q：如何在特定元素上禁用过渡？**
A：添加 `transition: none;` 到该元素。

---

## 📚 参考

- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Quartz 4 Docs](https://quartz.jzhao.xyz/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

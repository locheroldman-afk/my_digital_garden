# 极简手绘风 - 主题切换动画完整指南

## 📋 概述

本方案提供了一套完整的、极简手绘风格的主题切换动画系统，包括：

✅ **极简手绘太阳图标** - 线条圆润、淡黄色、8 条光线
✅ **毛笔风月亮图标** - 粗细变化、弯月、柔和灰紫色
✅ **平滑的 0.7s 过渡动画** - 从下向上升起，透明度和位置同步变化
✅ **完整的 SCSS 样式系统** - 可直接集成到 Quartz
✅ **原生 JavaScript** - 兼容 Quartz 的 `html.dark` 逻辑
✅ **无障碍支持** - ARIA 标签、键盘导航、减少动画模式
✅ **手绘感抖动动画** - 可选的微弱摆动效果

---

## 📂 文件结构

### 新增文件

```
publish/
├── quartz/
│   ├── styles/
│   │   └── theme-toggle-animation.scss    ← 动画 SCSS（新增）
│   └── components/
│       └── ThemeToggleIcons.tsx           ← SVG 图标组件（新增）
├── theme-toggle-demo.html                 ← 完整 HTML 演示（新增）
└── .github/
    └── THEME_TOGGLE_GUIDE.md             ← 本文件
```

---

## 🎨 视觉设计

### 太阳图标

- **颜色**：`#FFD700`（淡温暖黄）
- **风格**：极简手绘
- **成分**：1 个圆心 + 8 条光线
- **动画**：不透明度 0→1，位置从下向上升起
- **状态**：仅在亮模式 (`body:not(.dark)`) 显示

### 月亮图标

- **颜色**：`#C9B5A0`（柔和灰紫）
- **风格**：毛笔风，弯月形
- **成分**：主弯月路径 + 内部阴影 + 发光点
- **笔触特性**：
  - 粗细变化（主笔 1.5px，阴影 0.8px）
  - 断笔效果（通过多条路径模拟）
  - 笔锋感（圆形 stroke-linecap）
- **动画**：不透明度 0→1，位置从下向上升起
- **状态**：仅在暗模式 (`body.dark`) 显示

---

## 🔧 SCSS 详解

### 文件：`quartz/styles/theme-toggle-animation.scss`

#### 1. 容器样式 (`.theme-toggle-wrapper`)

```scss
.theme-toggle-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
  /* ... */
}
```

**用途**：主题按钮容器，相对定位以支持内部 SVG 的绝对定位

#### 2. 图标容器 (`.icon-sun`, `.icon-moon`)

```scss
.icon-sun {
  position: absolute;
  opacity: 0;
  transform: translate(-50%, calc(-50% + 15px)); /* 初始位置：下方 15px */
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

body:not(.dark) .icon-sun {
  opacity: 1;
  transform: translate(-50%, -50%); /* 最终位置：居中 */
}
```

**动画原理**：

- 初始状态：透明（opacity: 0）+ 下移 15px
- 激活状态：完全不透明（opacity: 1）+ 回到中心
- 缓动函数：`cubic-bezier(0.4, 0, 0.2, 1)` 提供柔和的加速度曲线
- 耗时：0.7s（柔和自然）

#### 3. SVG 笔触动画

```scss
body:not(.dark) .sun-ray {
  stroke: #ffd700;
  opacity: 0.6;
  transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

body:not(.dark) .icon-sun:hover .sun-ray {
  opacity: 1; /* Hover 时亮度提升 */
}
```

**用途**：

- 基础状态：略淡（opacity 0.6）
- Hover：完全显示（opacity 1）
- 配合升起动画，整体亮度逐渐提升

#### 4. 手绘抖动动画（可选）

```scss
@keyframes handdrawn-wobble-sun {
  0%,
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50.8%, -50%) rotate(0.5deg);
  }
  /* ... */
}

.theme-toggle-wrapper.wobble .icon-sun {
  animation: handdrawn-wobble-sun 2s ease-in-out infinite;
}
```

**用途**：

- 轻微的 1px 左右摆动
- 微小的旋转（±0.5°）
- 周期 2s，营造手绘感
- 仅在添加 `.wobble` class 时启用

#### 5. Hover 效果

```scss
.theme-toggle-wrapper:hover {
  transform: scale(1.08); /* 轻微放大 */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**用途**：用户交互反馈，极简而自然

#### 6. 无障碍支持

```scss
.theme-toggle-wrapper:focus-visible {
  outline: 2px solid var(--light-accent, #8ba5c2);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .icon-sun,
  .icon-moon {
    transition: none;
  }
}
```

**用途**：

- 键盘焦点可见
- 尊重用户的"减少动画"偏好

---

## 📝 SVG 图标详解

### 太阳图标 (SunIcon)

```tsx
<svg viewBox="0 0 28 28" fill="none" stroke="currentColor">
  <!-- 圆心（填充） -->
  <circle class="sun-circle" cx="14" cy="14" r="5" fill="#FFD700" />

  <!-- 8 条光线（笔画） -->
  <line class="sun-ray" x1="14" y1="3" x2="14" y2="5" stroke="#FFD700" />
  <!-- ... 其他 7 条 -->
</svg>
```

**特点**：

- 使用 `<circle>` 和 `<line>` 的组合
- 线条圆润（`stroke-linecap="round"`）
- 每条光线独立可控
- 轻易支持单独的 opacity 过渡

### 月亮图标 (MoonIcon)

```tsx
<svg viewBox="0 0 28 28" fill="none" stroke="currentColor">
  <!-- 主弯月（路径） -->
  <path class="moon-stroke" d="M 8 10 Q 6 14 8 18 Q 13 22 18 20 Q 20 18 20 14 Q 20 10 18 8 Q 13 6 8 10"
        stroke="#C9B5A0" stroke-width="1.5" />

  <!-- 内部阴影（更细的线） -->
  <path class="moon-stroke" d="M 10 12 Q 12 14 11 16"
        stroke="#C9B5A0" stroke-width="0.8" opacity="0.4" />

  <!-- 发光点（极轻） -->
  <circle cx="19" cy="10" r="2" stroke="#C9B5A0" opacity="0.3" />
</svg>
```

**毛笔风特性**：

- 使用二次贝塞尔曲线 (`Q`) 创建柔和弧线
- 多层笔触：主线 1.5px + 阴影 0.8px
- 断笔效果：内部阴影线单独渲染
- 粗细变化：通过多个 stroke-width 实现
- 笔锋感：圆形 stroke-linecap 和流畅的曲线

---

## 🚀 集成步骤

### 方案 A：直接使用完整 HTML（最快）

1. 打开 `theme-toggle-demo.html`
2. 复制其中的 `<button>` 部分到你的 Quartz 导航组件
3. 复制 `<style>` 中与 `.theme-toggle-wrapper` 相关的 CSS
4. 复制 `<script>` 中的 JavaScript 逻辑

### 方案 B：集成到 Quartz（推荐）

#### 步骤 1：导入 SCSS

编辑 `quartz/styles/index.scss` 或主样式入口：

```scss
@import "./theme-toggle-animation.scss";
```

#### 步骤 2：使用 SVG 组件（React）

在 `quartz/components/` 中创建导航组件，导入图标：

```tsx
import { SunIcon, MoonIcon } from "./ThemeToggleIcons"

export default function Navigation() {
  return (
    <nav>
      <button
        className="theme-toggle-wrapper"
        onClick={() => window.toggleTheme?.()}
        aria-label="Toggle dark mode"
      >
        <SunIcon />
        <MoonIcon />
      </button>
    </nav>
  )
}
```

#### 步骤 3：添加 JavaScript 逻辑

将 `theme-toggle-demo.html` 中的 JavaScript 部分复制到 `quartz/static/theme-toggle.js`：

```javascript
function toggleTheme() {
  const body = document.body
  const isDark = body.classList.contains("dark")

  if (isDark) {
    body.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    body.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}

window.toggleTheme = toggleTheme

// 初始化...
```

Quartz 会自动加载 `static/` 目录下的 JS 文件。

#### 步骤 4：确保 Quartz 使用 `body.dark`

检查 Quartz 的暗黑模式脚本是否添加/移除 `body` 的 `.dark` class。如果不是，编辑你的主题脚本以确保这一点。

---

## 🎬 动画原理详解

### 升起动画流程

**初始状态（页面加载）**

```
太阳：opacity: 0, transform: translate(-50%, calc(-50% + 15px))
月亮：opacity: 0, transform: translate(-50%, calc(-50% + 15px))
```

**切换到亮模式**

```
过程（0.7s）：
  0ms   → 700ms
  opacity: 0 → 1
  translateY: +15px → 0px

结果：太阳从下方升起、渐渐显现
```

**切换到暗模式**

```
过程（0.7s）：
  0ms   → 700ms
  opacity: 0 → 1
  translateY: +15px → 0px

结果：月亮从下方升起、渐渐显现
```

### 缓动函数解析

`cubic-bezier(0.4, 0, 0.2, 1)` 提供：

- **早期加速**（0～30%）：快速离开初始位置
- **中期稳定**（30%～70%）：匀速上升
- **末期减速**（70%～100%）：缓缓靠近最终位置
- **整体感觉**：柔和、自然、不生硬

---

## 🎨 自定义指南

### 改变动画时长

编辑 `theme-toggle-animation.scss`：

```scss
/* 原: 0.7s */
.icon-sun,
.icon-moon {
  transition:
    opacity 0.5s,
    transform 0.5s; /* 改为 0.5s（快）或 0.9s（慢） */
}
```

### 改变图标颜色

太阳颜色（淡黄）：

```scss
.sun-ray,
.sun-circle {
  stroke: #ffd700; /* 改为其他颜色 */
}
```

月亮颜色（灰紫）：

```scss
.moon-stroke {
  stroke: #c9b5a0; /* 改为其他颜色 */
}
```

### 启用手绘抖动效果

在按钮 HTML 中添加 `wobble` class：

```html
<button class="theme-toggle-wrapper wobble">
  <!-- ... -->
</button>
```

或通过 JavaScript 动态添加：

```javascript
document.querySelector(".theme-toggle-wrapper").classList.add("wobble")
```

### 关闭 Hover 效果

编辑 SCSS：

```scss
.theme-toggle-wrapper:hover {
  transform: none; /* 改为 none 禁用放大效果 */
}
```

---

## 📱 响应式调整

在 `theme-toggle-animation.scss` 中已包含：

```scss
@media (max-width: 768px) {
  .theme-toggle-wrapper {
    width: 50px;
    height: 50px;
  }

  .icon-sun,
  .icon-moon {
    width: 24px;
    height: 24px;
  }
}
```

自动在小屏幕上缩小 20%。

---

## ♿ 无障碍特性

✅ **ARIA 标签**

```html
<button aria-label="Toggle dark mode" title="Click to toggle theme"></button>
```

✅ **键盘导航**

```javascript
button.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    toggleTheme()
  }
})
```

✅ **焦点指示**

```scss
.theme-toggle-wrapper:focus-visible {
  outline: 2px solid #8ba5c2;
}
```

✅ **减少动画模式**

```scss
@media (prefers-reduced-motion: reduce) {
  .icon-sun,
  .icon-moon {
    transition: none;
  }
}
```

---

## 🧪 测试清单

- [ ] 点击按钮，太阳平滑升起（亮模式）
- [ ] 再次点击，月亮平滑升起（暗模式）
- [ ] 页面背景平滑过渡
- [ ] Hover 时按钮有反馈（放大）
- [ ] 在手机上测试响应式缩放
- [ ] Tab 键可聚焦按钮，按 Enter 切换主题
- [ ] 浏览器 DevTools 中禁用动画，动画消失
- [ ] localStorage 保存用户选择
- [ ] 刷新页面，保持之前的主题

---

## 💡 最佳实践

1. **保持 0.6s～0.9s 的动画时长** - 太快显得生硬，太慢显得迟钝
2. **使用柔和的缓动函数** - `cubic-bezier(0.4, 0, 0.2, 1)` 是黄金比例
3. **SVG 笔触不要过粗** - 1.2px～1.5px 是最佳范围
4. **图标颜色不要太饱和** - 淡黄和灰紫都是低饱和的选择
5. **始终提供无障碍支持** - ARIA 标签、键盘导航、焦点指示
6. **尊重用户偏好** - 检查 `prefers-reduced-motion` 并相应禁用动画

---

## 🐛 常见问题

### Q: 动画不工作？

A: 检查：

1. SCSS 是否正确导入
2. HTML 中的 class 名称是否正确（`.theme-toggle-wrapper` / `.icon-sun` / `.icon-moon`）
3. JavaScript 中的 `body.classList.toggle('dark')` 是否执行
4. 浏览器是否禁用了 CSS 动画（DevTools > 性能 > 禁用 CSS 动画）

### Q: 月亮看不清？

A: 检查：

1. 背景颜色是否足够暗（`#0F0D0A` 推荐）
2. 月亮颜色是否足够浅（`#C9B5A0` 推荐）
3. 笔触宽度是否太细（至少 1.2px）

### Q: 如何禁用手绘抖动？

A: 在 HTML 中不添加 `wobble` class，或移除以下 CSS：

```scss
@keyframes handdrawn-wobble-sun {
  /* ... */
}
.theme-toggle-wrapper.wobble {
  /* ... */
}
```

### Q: 支持哪些浏览器？

A: 所有现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）

---

## 📚 参考资源

- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [SVG Stroke Properties](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)
- [Quartz 4 Documentation](https://quartz.jzhao.xyz/)

---

## 📞 支持

如需进一步调整或有问题，参考：

- `theme-toggle-demo.html` - 完整的可运行示例
- `quartz/styles/theme-toggle-animation.scss` - 详细注释的样式
- `quartz/components/ThemeToggleIcons.tsx` - SVG 组件源码

**祝你的主题切换动画光彩动人！** ✨

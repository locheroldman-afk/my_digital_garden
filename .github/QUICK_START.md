# 快速集成指南 - 极简手绘风格主题

## ⚡ 5 分钟快速开始

### 第 1 步：复制 SCSS 文件

✅ 已完成：`quartz/styles/theme-transition.scss` 已创建

### 第 2 步：在主样式中导入

编辑 `quartz/styles/index.scss` 或 `base.scss`（Quartz 的主样式入口），在末尾添加：

```scss
/* 导入主题切换系统 */
@import "./theme-transition.scss";
```

完整示例：
```scss
@import "./base.scss";
@import "./handdrawn.scss";
@import "./custom.scss";
@import "./theme-transition.scss";  // ← 最后导入
```

### 第 3 步：复制主题切换脚本

✅ 已完成：`quartz/static/theme-manager.js` 已创建

Quartz 会自动加载 `static/` 目录下的 JS 文件，无需手动配置。

### 第 4 步：确保 HTML 中有主题按钮

在你的导航或页脚中添加：

```html
<button class="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
  <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
  <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>
```

或在 Quartz 组件中：

**文件**：`quartz/components/Navigation.tsx`（示例）

```typescript
export default function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <button className="theme-toggle" aria-label="Toggle dark mode">
        {/* SVG 图标 */}
      </button>
    </nav>
  );
}
```

### 第 5 步：构建并测试

```bash
npm run build
npm run preview
```

打开浏览器，点击主题按钮。应该看到：
- ✅ 平滑的背景色过渡（0.6s）
- ✅ 文字颜色随之变化
- ✅ 图片在暗模式自动变暗
- ✅ 太阳/月亮图标旋转动画

---

## 🎨 视觉效果检查

| 项目 | 亮模式 | 暗模式 |
|------|--------|--------|
| 背景 | 纯白 `#FFFFFF` | 深黑 `#0F0D0A` |
| 正文 | 墨黑 `#2B2620` | 温白 `#F5F1E8` |
| 边框 | 浅灰 `#E8E6E1` | 深灰 `#3A3530` |
| 点睛色 | 灰蓝 `#8BA5C2` | 灰蓝 `#8BA5C2` |
| 过渡速度 | 0.6s 柔和 | 0.6s 柔和 |

---

## 🔧 常见调整

### 改变点睛色

编辑 `theme-transition.scss`，找到：
```scss
--light-accent: #8BA5C2;
--dark-accent: #8BA5C2;
```

改为（例如：暖灰棕）：
```scss
--light-accent: #C9B5A0;
--dark-accent: #C9B5A0;
```

### 加快或减速过渡

找到：
```scss
--theme-transition: background-color 0.6s, /* ... */
```

改为 `0.4s`（快）或 `0.8s`（慢）。

### 关闭图片自动调暗

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

### 禁用主题按钮旋转动画

找到：
```scss
.theme-toggle:hover {
  transform: scale(1.1) rotate(15deg);
}
```

改为：
```scss
.theme-toggle:hover {
  transform: scale(1.1);  /* 只保留缩放，移除旋转 */
}
```

---

## 📱 响应式测试

### 桌面 (≥ 1024px)
```bash
# 浏览器全屏，应该显示完整导航
```

### 平板 (768px - 1023px)
```bash
# 使用 DevTools 调整窗口到 800px
# 侧栏应自动改为相对定位
```

### 手机 (< 768px)
```bash
# 使用 DevTools 调整窗口到 375px
# 应显示单列布局，导航可能改为汉堡菜单
```

---

## ♿ 无障碍测试

### 1. 键盘导航
```
- 按 Tab 键聚焦主题按钮
- 按 Enter 或 Space 切换主题
```

### 2. 减少动画模式

在 macOS：
```
系统偏好设置 → 辅助功能 → 显示 → 减少动作
```

在 Windows：
```
设置 → 轻松访问 → 显示 → 显示动画
```

应该看到所有动画被禁用。

### 3. 高对比度模式
```
Windows: 设置 → 轻松访问 → 显示 → 高对比度
```

应该使用更深/更亮的颜色。

---

## 🐛 调试技巧

### 检查当前主题

在浏览器控制台输入：
```javascript
// 查看当前主题
console.log(document.body.classList.contains('dark') ? 'dark' : 'light');

// 或使用提供的 API
console.log(ThemeManager.getTheme());
```

### 手动切换主题

在控制台输入：
```javascript
ThemeManager.toggleTheme();           // 切换
ThemeManager.applyTheme('dark');      // 设为暗
ThemeManager.applyTheme('light');     // 设为亮
ThemeManager.setAutoTheme();          // 使用系统偏好
```

### 监听主题变化

在控制台输入：
```javascript
window.addEventListener('theme-changed', (e) => {
  console.log('主题已改为:', e.detail.theme);
});
```

### 检查 CSS 变量是否正确应用

```javascript
// 查看计算后的 CSS 变量
const style = getComputedStyle(document.documentElement);
console.log(style.getPropertyValue('--light-bg'));
console.log(style.getPropertyValue('--dark-bg'));
```

---

## 📂 文件清单

集成完成后，你的项目应该有：

```
publish/
├── quartz/
│   ├── styles/
│   │   ├── base.scss              ← Quartz 基础
│   │   ├── handdrawn.scss         ← 手绘风格
│   │   ├── custom.scss            ← 你的自定义
│   │   ├── theme-transition.scss  ← 新增 ✅
│   │   └── index.scss             ← 主入口
│   ├── static/
│   │   ├── theme-manager.js       ← 新增 ✅
│   │   ├── graph-toggle.js        ← 原有
│   │   └── ...
│   └── components/
│       ├── Navigation.tsx         ← 需要更新
│       └── ...
├── .github/
│   ├── DESIGN_SYSTEM.md           ← 设计系统
│   ├── IMPLEMENTATION_GUIDE.md    ← 实现指南
│   ├── THEME_IMPLEMENTATION.md    ← 主题实现 ✅
│   └── ...
└── quartz.config.ts              ← 配置
```

---

## ✨ 最终效果验证

部署前完成检查：

- [ ] SCSS 文件已导入
- [ ] 主题切换脚本已加载
- [ ] HTML 中有 `.theme-toggle` 按钮
- [ ] 点击按钮后主题平滑切换
- [ ] 系统主题偏好被正确检测
- [ ] localStorage 保存用户选择
- [ ] 响应式设计在各设备上正常
- [ ] 减少动画模式被尊重
- [ ] 图片在暗模式正确调整
- [ ] 所有文本对比度充足

---

## 🚀 部署到生产环境

当所有测试通过后：

```bash
# 清理缓存
npm run clean

# 完整构建
npm run build

# 检查构建输出
ls -la public/

# 上传到服务器
# (具体命令取决于你的托管服务)
```

---

## 📞 遇到问题？

### 问题：切换主题时页面闪烁

**原因**：SCSS 导入顺序错误，导致 CSS 变量被覆盖

**解决**：确保 `theme-transition.scss` 是最后导入的

### 问题：主题按钮不响应

**原因**：脚本未加载或选择器不匹配

**解决**：
1. 检查浏览器控制台是否有错误
2. 确保 `.theme-toggle` 类名正确
3. 检查 `theme-manager.js` 是否在 `static/` 目录

### 问题：暗模式颜色看起来不对

**原因**：CSS 变量可能被其他样式覆盖

**解决**：在 DevTools 中检查计算的样式，确保 CSS 变量正确应用

### 问题：手机上主题切换不工作

**原因**：JavaScript 未正确绑定事件

**解决**：在控制台测试 `ThemeManager.toggleTheme()`

---

## 📚 更多资源

- 完整设计系统：`DESIGN_SYSTEM.md`
- 详细实现指南：`THEME_IMPLEMENTATION.md`
- CSS 过渡文档：[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- Quartz 官方文档：[quartz.jzhao.xyz](https://quartz.jzhao.xyz/)

---

**集成完成！享受你的极简手绘风格主题！** ✨


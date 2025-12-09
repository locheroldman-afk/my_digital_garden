# 极简手绘风设计系统 - 实现指南

## 📌 快速开始

你现在已经拥有了完整的设计系统。下面是如何使用它的步骤。

---

## 🎯 核心改变总结

### 1. **色彩系统升级**
- 背景：纯白 `#FFFFFF`（极简核心）
- 正文：墨黑 `#2B2620`（不刺眼）
- 点睛色：灰蓝 `#8BA5C2`（克制而温和）
- 中性色：用于分隔、背景层级

### 2. **排版优化**
- 标题：Caveat（手绘风，保留现有）
- 正文：Inter（比 Noto Sans 更干净现代）
- 代码：IBM Plex Mono（保留）

### 3. **视觉元素**
- 手绘线条：1.5px 铅笔灰（`#5A5550`）
- 按钮：线框风 + Hover 背景变灰蓝
- 卡片：柔和阴影 + 浅蓝边框
- 分隔线：虚线或波浪效果

### 4. **间距与留白**
- 标准间距单位：0.5rem ～ 4rem
- 段落间距：2.5rem ～ 3rem
- 区块间距：3rem ～ 4rem

---

## 📂 文件结构

```
publish/
├── .github/
│   └── DESIGN_SYSTEM.md          ← 完整设计说明书（已创建）
├── quartz.config.ts              ← 已更新：新颜色 + Inter 字体
├── quartz.layout.ts              ← 待优化：简化导航结构
├── quartz/styles/
│   ├── base.scss                 ← Quartz 基础（无需改）
│   ├── custom.scss               ← 待更新：集成新系统
│   └── handdrawn.scss            ← 新增：手绘风格库（已创建）
└── quartz/components/
    ├── Navigation.tsx            ← 新增：极简导航组件
    └── Footer.tsx                ← 新增：便签风页脚
```

---

## 🔧 配置文件已更新的内容

### `quartz.config.ts`

✅ 已完成：
- `typography.body` 改为 "Inter"
- `colors.lightMode.dark` 改为 `#2B2620`（墨黑）
- `colors.lightMode.light` 改为 `#FFFFFF`（纯白）
- `colors.lightMode.tertiary` 改为 `#8BA5C2`（灰蓝）
- `colors.darkMode` 调整以支持亮色文本

### `handdrawn.scss`

✅ 已创建：包含
- CSS 变量定义（颜色、间距、过渡）
- 全局排版规范
- 手绘风格组件库（按钮、卡片、分隔线等）
- 响应式设计
- 暗黑模式支持

---

## 🚀 下一步行动

### 第一步：验证样式
1. 在 `quartz/styles/` 中，确保 `handdrawn.scss` 被引入
2. 在 Quartz 的主样式文件中添加：
   ```scss
   @import "./handdrawn.scss";
   ```

### 第二步：更新布局结构
查看 `quartz.layout.ts`，简化为：
- **顶部**：Logo + 极简导航（主页 / 作品 / 关于 / 联系）
- **中间**：大面积留白 + 主要内容
- **底部**：便签风联系框

### 第三步：创建导航组件
在 `quartz/components/` 中创建简化的导航组件，替代现有的搜索框 + 暗黑切换。

### 第四步：优化首页
编辑 `content/index.md`，使用新的布局结构：
```markdown
# 欢迎来到我的数字花园

*一个极简、手绘风的思考空间*

---

## 最近的想法

- 模块一
- 模块二
- 模块三

---

**想聊天？** [联系我]
```

---

## 🎨 使用设计系统的最佳实践

### 在 Markdown 中使用

```markdown
# 使用卡片
<div class="card">
  这是一个卡片，有柔和的阴影和线框
</div>

# 使用便签风
<div class="note-box">
  📝 这看起来像贴在页面上的便签
</div>

# 使用分隔线
---

或自定义分隔线：
<div class="divider-wavy"></div>

# 使用按钮
<button class="btn">点击我</button>
```

### 在 HTML/Quartz 组件中使用

```html
<!-- 极简按钮 -->
<button class="btn">立即开始</button>

<!-- 卡片容器 -->
<div class="card">
  <h3>模块标题</h3>
  <p>这是一个卡片内容。</p>
</div>

<!-- 便签风格 -->
<div class="note-box">
  <p>📝 这是一条便签</p>
</div>

<!-- 带手绘边框的容器 -->
<div class="border-handdrawn">
  内容
</div>
```

### 在 SCSS 中使用

```scss
/* 使用 CSS 变量 */
.my-component {
  color: var(--dark-text);
  background-color: var(--ivory);
  border: var(--handdrawn-width) solid var(--handdrawn-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-light);
  transition: var(--transition-normal);
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
}
```

---

## 🎯 视觉检查清单

在部署前，检查以下项目：

- [ ] 背景是纯白 `#FFFFFF`
- [ ] 文本颜色是深灰 `#2B2620`（不是纯黑）
- [ ] 点睛色只出现在 5～8% 的区域（按钮、链接、重点）
- [ ] 手绘线条明显但不刺眼（铅笔灰 `#5A5550`）
- [ ] 段落间距充足（至少 2.5rem）
- [ ] 没有超过 3 种主要颜色
- [ ] 所有按钮都有 Hover 动画
- [ ] 移动设备上字号清晰（最小 16px）
- [ ] 响应式设计在平板和手机上测试通过

---

## 📖 参考资源

完整的设计说明书已保存在：
**`publish/.github/DESIGN_SYSTEM.md`**

其中包含：
- 详细色彩方案（HEX 代码）
- 排版规范
- 布局骨架
- 交互规范
- 响应式断点
- 设计哲学说明

---

## ❓ 常见问题

### Q1：如何在页面上添加手绘风格的分隔线？
A：使用 `<div class="divider-wavy"></div>` 或简单的 `---` Markdown 语法。

### Q2：按钮的颜色怎么选？
A：
- 正常态：白底 + 铅笔灰边框
- Hover态：灰蓝底 + 白字
- 参考 `handdrawn.scss` 中的 `button` 样式

### Q3：可以添加其他点睛色吗？
A：可以，但建议：
1. 从设计系统给出的替代方案中选（暖灰棕、淡灰绿等）
2. 只在一个页面或模块内使用
3. 不要超过 2 种辅助点睛色

### Q4：暗黑模式怎么配置？
A：`handdrawn.scss` 已内置暗黑模式支持。浏览器自动检测 `prefers-color-scheme`。

### Q5：如何加入加载动画？
A：可以创建一个简单的 SVG 手绘线条转圈动画。参考设计系统文档的"加载动画"部分。

---

## 🎓 设计理念回顾

这个系统遵循四个核心原则：

1. **极简** → 每个元素都有存在的理由
2. **手绘** → 传达"真实人类创作"的信号
3. **温和** → 不刺眼、易阅读、舒适浏览
4. **呼吸** → 充足的留白让思考有空间

记住：**设计不是装饰，而是让信息更清晰、体验更舒适。**

---

## 📞 需要帮助？

如果需要：
- 具体的 HTML/CSS 代码片段
- 针对某个特定页面的设计稿
- 手绘图标库
- 其他自定义组件

只管告诉我！我会继续帮你完善这个系统。


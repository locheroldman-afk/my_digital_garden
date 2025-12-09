/**
 * 主题切换脚本 - 极简手绘风格
 * Theme Toggle Script for Minimal Handdrawn Theme
 *
 * 功能：
 * - 检测系统主题偏好
 * - 提供手动切换功能
 * - 记忆用户选择（localStorage）
 * - 平滑过渡动画
 */

;(function () {
  "use strict"

  const STORAGE_KEY = "theme-preference"
  const LIGHT_THEME = "light"
  const DARK_THEME = "dark"
  const CLASS_DARK = "dark"

  /**
   * 获取用户的主题偏好
   * @returns {string} 'light' 或 'dark'
   */
  function getThemePreference() {
    // 1. 首先检查 localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return stored === DARK_THEME ? DARK_THEME : LIGHT_THEME
    }

    // 2. 检查系统偏好
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return DARK_THEME
    }

    // 3. 默认为亮模式
    return LIGHT_THEME
  }

  /**
   * 应用主题
   * @param {string} theme - 'light' 或 'dark'
   * @param {boolean} skipTransition - 是否跳过过渡动画（首次加载时使用）
   */
  function applyTheme(theme, skipTransition = false) {
    const isDark = theme === DARK_THEME
    const html = document.documentElement
    const body = document.body

    // 临时禁用过渡以快速应用初始主题
    if (skipTransition) {
      html.style.transition = "none"
      body.style.transition = "none"
    }

    // 应用主题 class
    if (isDark) {
      body.classList.add(CLASS_DARK)
      html.setAttribute("data-theme", DARK_THEME)
    } else {
      body.classList.remove(CLASS_DARK)
      html.setAttribute("data-theme", LIGHT_THEME)
    }

    // 恢复过渡
    if (skipTransition) {
      // 强制重排以应用样式
      // eslint-disable-next-line no-unused-expressions
      html.offsetHeight
      html.style.transition = ""
      body.style.transition = ""
    }

    // 保存到 localStorage
    localStorage.setItem(STORAGE_KEY, theme)

    // 触发自定义事件
    const event = new CustomEvent("theme-changed", {
      detail: { theme },
      bubbles: true,
      cancelable: true,
    })
    window.dispatchEvent(event)

    // 更新 meta 主题颜色（可选）
    updateMetaThemeColor(theme)
  }

  /**
   * 更新 meta 主题颜色标签
   * @param {string} theme - 'light' 或 'dark'
   */
  function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.name = "theme-color"
      document.head.appendChild(metaThemeColor)
    }

    if (theme === DARK_THEME) {
      metaThemeColor.content = "#0F0D0A" // 暗模式背景色
    } else {
      metaThemeColor.content = "#FFFFFF" // 亮模式背景色
    }
  }

  /**
   * 切换主题
   */
  function toggleTheme() {
    const current = document.body.classList.contains(CLASS_DARK) ? DARK_THEME : LIGHT_THEME
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME
    applyTheme(next)
  }

  /**
   * 初始化主题系统
   */
  function initTheme() {
    // 获取用户偏好
    const preference = getThemePreference()

    // 立即应用主题（无过渡），避免闪屏
    applyTheme(preference, true)

    // 为所有主题切换按钮绑定事件
    const toggleButtons = document.querySelectorAll(".theme-toggle")
    toggleButtons.forEach((button) => {
      button.addEventListener("click", toggleTheme)

      // 键盘支持（Enter 和 Space）
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggleTheme()
        }
      })
    })

    // 监听系统主题变化
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")

      // 现代浏览器使用 addListener（已弃用但兼容性好）或 addEventListener
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener("change", (e) => {
          // 只在用户没有手动设置时自动切换
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME)
          }
        })
      } else if (darkModeQuery.addListener) {
        // 旧版 Safari
        darkModeQuery.addListener((e) => {
          if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? DARK_THEME : LIGHT_THEME)
          }
        })
      }
    }
  }

  /**
   * 提供公共 API
   */
  window.ThemeManager = {
    toggleTheme,
    applyTheme: (theme) => applyTheme(theme, false),
    getTheme: () => (document.body.classList.contains(CLASS_DARK) ? DARK_THEME : LIGHT_THEME),
    setAutoTheme: () => {
      localStorage.removeItem(STORAGE_KEY)
      applyTheme(getThemePreference())
    },
  }

  // DOM 加载完成后初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme)
  } else {
    initTheme()
  }

  // 页面导航时重新初始化（对于 SPA）
  window.addEventListener("nav", initTheme)
})()

/**
 * 使用方式：
 *
 * 1. 切换主题
 *    ThemeManager.toggleTheme();
 *
 * 2. 设置为特定主题
 *    ThemeManager.applyTheme('dark');
 *    ThemeManager.applyTheme('light');
 *
 * 3. 获取当前主题
 *    const current = ThemeManager.getTheme(); // 'dark' or 'light'
 *
 * 4. 使用系统偏好
 *    ThemeManager.setAutoTheme();
 *
 * 5. 监听主题变化事件
 *    window.addEventListener('theme-changed', (e) => {
 *      console.log('主题已改为:', e.detail.theme);
 *    });
 */

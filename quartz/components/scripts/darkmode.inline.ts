const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

// 公开的 toggleTheme API，供主题按钮调用
window.toggleTheme = function() {
  const newTheme =
    document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
  document.documentElement.setAttribute("saved-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  emitThemeChangeEvent(newTheme)
}

const setupThemeToggle = () => {
  // 使用 事件委托，这样即使按钮还没加载也能工作
  document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement
    if (target?.classList.contains("theme-toggle-wrapper")) {
      window.toggleTheme?.()
    }
  }, true)
}

const themeChange = (e: MediaQueryListEvent) => {
  const newTheme = e.matches ? "dark" : "light"
  document.documentElement.setAttribute("saved-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  emitThemeChangeEvent(newTheme)
}

// 立即设置事件委托（不需要等待 DOM 加载）
setupThemeToggle()

// Listen for changes in prefers-color-scheme
const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
colorSchemeMediaQuery.addEventListener("change", themeChange)
window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))

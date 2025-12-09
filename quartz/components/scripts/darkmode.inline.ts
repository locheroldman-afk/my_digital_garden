const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)
document.body.classList.toggle("dark", currentTheme === "dark")

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
  document.body.classList.toggle("dark", newTheme === "dark")
  localStorage.setItem("theme", newTheme)
  emitThemeChangeEvent(newTheme)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    window.toggleTheme?.()
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    document.body.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  // 兼容旧的 .darkmode 和新的 .theme-toggle-wrapper
  for (const darkmodeButton of document.querySelectorAll(".darkmode, .theme-toggle-wrapper")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})

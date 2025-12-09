// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
// @ts-ignore
import toggleAnimationStyles from "../styles/theme-toggle-animation.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { SunIcon, MoonIcon } from "./ThemeToggleIcons"

const Darkmode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <button
      class={classNames(displayClass, "theme-toggle-wrapper")}
      aria-label={i18n(cfg.locale).components.themeToggle.darkMode}
      title="Toggle dark mode"
    >
      <SunIcon />
      <MoonIcon />
    </button>
  )
}

Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles + toggleAnimationStyles

export default (() => Darkmode) satisfies QuartzComponentConstructor

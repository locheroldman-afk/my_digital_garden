/**
 * 极简手绘风 SVG 图标组件
 * Theme Toggle SVG Icons - Handdrawn Style
 * 
 * 包含：
 * - 极简手绘太阳（线条圆润、淡黄色）
 * - 毛笔风月亮（粗细变化、柔和灰紫色）
 */

export const SunIcon = () => {
  return (
    <svg
      className="icon-sun"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 太阳圆心 */}
      <circle className="sun-circle" cx="14" cy="14" r="5" fill="#FFD700" />
      
      {/* 上光线 */}
      <line className="sun-ray" x1="14" y1="3" x2="14" y2="5" stroke="#FFD700" />
      {/* 下光线 */}
      <line className="sun-ray" x1="14" y1="23" x2="14" y2="25" stroke="#FFD700" />
      {/* 左光线 */}
      <line className="sun-ray" x1="3" y1="14" x2="5" y2="14" stroke="#FFD700" />
      {/* 右光线 */}
      <line className="sun-ray" x1="23" y1="14" x2="25" y2="14" stroke="#FFD700" />
      
      {/* 四个斜光线 */}
      <line className="sun-ray" x1="6.2" y1="6.2" x2="7.8" y2="7.8" stroke="#FFD700" />
      <line className="sun-ray" x1="20.2" y1="20.2" x2="21.8" y2="21.8" stroke="#FFD700" />
      <line className="sun-ray" x1="21.8" y1="6.2" x2="20.2" y2="7.8" stroke="#FFD700" />
      <line className="sun-ray" x1="7.8" y1="20.2" x2="6.2" y2="21.8" stroke="#FFD700" />
    </svg>
  );
};

export const MoonIcon = () => {
  return (
    <svg
      className="icon-moon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
    >
      {/* 毛笔风弯月 - 使用 path 创建不规则线条感 */}
      <path
        className="moon-stroke"
        d="M 8 10 Q 6 14 8 18 Q 13 22 18 20 Q 20 18 20 14 Q 20 10 18 8 Q 13 6 8 10"
        stroke="#C9B5A0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      
      {/* 轻微的月亮内部阴影线条（毛笔感） */}
      <path
        className="moon-stroke"
        d="M 10 12 Q 12 14 11 16"
        stroke="#C9B5A0"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* 右侧发光效果（极轻） */}
      <circle
        cx="19"
        cy="10"
        r="2"
        fill="none"
        stroke="#C9B5A0"
        strokeWidth="0.6"
        opacity="0.3"
      />
    </svg>
  );
};

/**
 * 使用方式（React/Quartz 组件）：
 * 
 * import { SunIcon, MoonIcon } from './theme-icons';
 * 
 * export default function ThemeToggle() {
 *   return (
 *     <button className="theme-toggle-wrapper" onClick={() => window.toggleTheme()}>
 *       <SunIcon />
 *       <MoonIcon />
 *     </button>
 *   );
 * }
 */

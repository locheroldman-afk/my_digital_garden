import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // 顶部导航简化 - 移除搜索框和暗黑模式按钮
  header: [],
  afterBody: [],
  // 精简页脚 - 保留必要联系方式
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      Contact: "https://example.com/contact",
    },
  }),
}

// 单页面布局 - 极简化：只显示核心内容
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // 只在非首页显示面包屑
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
  ],
  // 左侧栏：悬浮文件树（通过CSS隐藏/显示）
  left: [
    Component.Explorer(),
  ],
  // 右侧栏：保留关系图谱和目录
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// 列表页面布局 - 同样极简化
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [],
  right: [],
}
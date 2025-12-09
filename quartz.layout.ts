import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 全页面共享组件
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // 顶部导航栏：搜索、主题切换、Reader Mode 靠近左边
  header: [Component.Search(), Component.Darkmode(), Component.ReaderMode(), Component.Spacer()],
  afterBody: [],
  // 页脚：项目链接和元信息
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/locheroldman-afk/my_digital_garden",
      Quartz: "https://quartz.jzhao.xyz/",
    },
  }),
}

// 内容页面布局：左导航 | 中心内容 | 右侧栏
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // 面包屑导航（首页除外）
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // 标题和元信息（日期、阅读时间等）
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  // 左侧栏：Obsidian 风格的文件树导航
  left: [Component.Explorer()],
  // 右侧栏：目录 + 反向链接 + 关系图谱
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
    Component.DesktopOnly(
      Component.Graph({
        localGraph: {
          depth: 1,
          scale: 1.2,
          repelForce: 0.5,
          centerForce: 0.3,
          linkDistance: 30,
          fontSize: 0.6,
          showTags: false,
          enableRadial: false,
        },
        globalGraph: {
          depth: -1,
          scale: 0.9,
          repelForce: 0.5,
          centerForce: 0.2,
          linkDistance: 30,
          fontSize: 0.6,
          showTags: false,
          enableRadial: true,
        },
      }),
    ),
  ],
}

// 列表页面布局（标签页、文件夹等）
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  // 左侧栏保留，方便导航
  left: [Component.Explorer()],
  // 右侧栏显示标签或最近笔记
  right: [Component.DesktopOnly(Component.RecentNotes({ limit: 5 }))],
}

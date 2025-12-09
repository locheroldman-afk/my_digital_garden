// 将搜索框、暗黑模式按钮和图谱切换组织在右上角控制面板
(function() {
  let controlsPanel = null;
  
  function setupRightSidebarControls() {
    const rightSidebar = document.querySelector('.sidebar.right');
    if (!rightSidebar) return;

    // 移除旧控制面板（如果存在）
    const existingPanel = rightSidebar.querySelector('.sidebar-controls');
    if (existingPanel) existingPanel.remove();

    // 创建控制面板容器
    controlsPanel = document.createElement('div');
    controlsPanel.className = 'sidebar-controls';

    // 获取或创建搜索框
    let searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
      // 克隆搜索框到控制面板
      const searchClone = searchContainer.cloneNode(true);
      controlsPanel.appendChild(searchClone);
    }

    // 创建按钮行容器
    const buttonRow = document.createElement('div');
    buttonRow.className = 'sidebar-controls-buttons';

    // 获取或创建暗黑模式按钮
    let darkmodeButton = document.querySelector('[class*="darkmode"]') || 
                        document.querySelector('button[aria-label*="dark"]');
    if (darkmodeButton) {
      const buttonClone = darkmodeButton.cloneNode(true);
      buttonRow.appendChild(buttonClone);
    }

    // 创建图谱切换按钮
    const graphToggleButton = document.createElement('button');
    graphToggleButton.className = 'graph-toggle-button';
    graphToggleButton.setAttribute('aria-label', 'Toggle graph');
    graphToggleButton.innerHTML = '◉';
    graphToggleButton.title = 'Toggle relationship graph';

    // 处理图谱切换
    const handleGraphToggle = () => {
      const isHidden = rightSidebar.classList.toggle('graph-hidden');
      localStorage.setItem('graphHidden', isHidden);
      graphToggleButton.style.opacity = isHidden ? '0.6' : '1';
    };

    graphToggleButton.addEventListener('click', handleGraphToggle);
    buttonRow.appendChild(graphToggleButton);

    // 添加按钮行到控制面板
    controlsPanel.appendChild(buttonRow);

    // 将控制面板插入到右侧栏最前面
    rightSidebar.insertBefore(controlsPanel, rightSidebar.firstChild);

    // 恢复之前保存的图谱隐藏状态
    const graphHidden = localStorage.getItem('graphHidden') === 'true';
    if (graphHidden) {
      rightSidebar.classList.add('graph-hidden');
      graphToggleButton.style.opacity = '0.6';
    }

    // 清理函数
    window.addCleanup?.(() => {
      graphToggleButton?.removeEventListener('click', handleGraphToggle);
    });
  }

  // 在页面加载和导航时设置
  document.addEventListener('nav', setupRightSidebarControls);
  
  // 初始加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRightSidebarControls);
  } else {
    setupRightSidebarControls();
  }
})();

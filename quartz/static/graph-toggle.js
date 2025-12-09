// 图谱显示/隐藏切换脚本
(function() {
  let toggleButton = null;
  
  function setupGraphToggle() {
    const rightSidebar = document.querySelector('.sidebar.right');
    if (!rightSidebar) return;

    // 移除旧按钮（如果存在）
    const existingButton = document.querySelector('.graph-toggle-button');
    if (existingButton) existingButton.remove();

    // 创建切换按钮
    toggleButton = document.createElement('button');
    toggleButton.className = 'graph-toggle-button';
    toggleButton.setAttribute('aria-label', 'Toggle graph');
    toggleButton.innerHTML = '◉';
    toggleButton.title = 'Toggle relationship graph';
    
    // 添加到 body 中
    document.body.appendChild(toggleButton);

    // 从 localStorage 读取图谱的显示状态
    const graphHidden = localStorage.getItem('graphHidden') === 'true';
    if (graphHidden) {
      rightSidebar.classList.add('graph-hidden');
      toggleButton.style.opacity = '0.6';
    }

    // 处理点击事件
    const handleToggleClick = () => {
      const isHidden = rightSidebar.classList.toggle('graph-hidden');
      localStorage.setItem('graphHidden', isHidden);
      toggleButton.style.opacity = isHidden ? '0.6' : '1';
    };

    toggleButton.addEventListener('click', handleToggleClick);

    // 清理函数
    window.addCleanup?.(() => {
      toggleButton?.removeEventListener('click', handleToggleClick);
    });
  }

  // 在页面加载和导航时设置
  document.addEventListener('nav', setupGraphToggle);
  
  // 初始加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGraphToggle);
  } else {
    setupGraphToggle();
  }
})();

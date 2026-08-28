const GlobalDSSystemTabs = (() => {
  function activateTab(root, nextTab, tabSelector, panelSelector, options = {}){
    const tabs = [...root.querySelectorAll(tabSelector)];
    const panels = [...root.querySelectorAll(panelSelector)];
    if (!tabs.includes(nextTab)) return;

    tabs.forEach(tab => {
      const selected = tab === nextTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      panel.hidden = panel.id !== nextTab.getAttribute('aria-controls');
    });
    if (options.focus) nextTab.focus();
  }

  function bind(root, { tabSelector, panelSelector }){
    root.addEventListener('click', event => {
      const tab = event.target.closest(tabSelector);
      if (tab) activateTab(root, tab, tabSelector, panelSelector);
    });

    root.addEventListener('keydown', event => {
      const currentTab = event.target.closest?.(tabSelector);
      if (!currentTab) return;

      const tabs = [...currentTab.closest('[role="tablist"]').querySelectorAll(tabSelector)];
      const currentIndex = tabs.indexOf(currentTab);
      let nextIndex;
      if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(root, tabs[nextIndex], tabSelector, panelSelector, { focus:true });
    });
  }

  return { bind };
})();

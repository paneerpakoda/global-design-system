const GlobalDSColourTabs = (() => {
  function activateColourTab(root, tabId, options = {}){
    const tabs = [...root.querySelectorAll('[data-colour-tab]')];
    const panels = [...root.querySelectorAll('.colour-system-panel')];
    const nextTab = tabs.find(tab => tab.getAttribute('data-colour-tab') === tabId);
    if (!nextTab) return;

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

  function bind(root){
    root.addEventListener('click', event => {
      const tab = event.target.closest('[data-colour-tab]');
      if (tab) activateColourTab(root, tab.getAttribute('data-colour-tab'));
    });

    root.addEventListener('keydown', event => {
      const currentTab = event.target.closest?.('[data-colour-tab]');
      if (!currentTab) return;

      const tabs = [...currentTab.closest('[role="tablist"]').querySelectorAll('[data-colour-tab]')];
      const currentIndex = tabs.indexOf(currentTab);
      let nextIndex;
      if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateColourTab(root, tabs[nextIndex].getAttribute('data-colour-tab'), { focus:true });
    });
  }

  return { bind };
})();

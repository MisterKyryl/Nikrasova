function showMore() {
  const showMoreBlocks = document.querySelectorAll("[data-fls-showmore]");
  showMoreBlocks.forEach((block) => {
    const body = block.querySelector("[data-fls-showmore-body]");
    const button = block.querySelector("[data-fls-showmore-button]");
    if (!body || !button) return;
    const items = Array.from(body.children);
    if (!items.length) return;
    let currentRows = 0;
    let itemsPerRow = 1;
    const config = parseShowmoreConfig(block.dataset.flsShowmore);
    function parseShowmoreConfig(value = "") {
      const matches = value.match(/\[[^\]]+\]|[^,\s]+/g) || [];
      return matches.map((v) => {
        if (v.startsWith("[")) {
          const [bp, rows] = v.replace(/[\[\]\s]/g, "").split(",");
          return { bp: parseFloat(bp), rows: parseInt(rows) };
        }
        return { default: true, rows: parseInt(v) };
      });
    }
    function getRowsToShow() {
      const width = window.innerWidth;
      let rows;
      const defaultConfig = config.find((c) => c.default);
      if (defaultConfig) rows = defaultConfig.rows;
      for (const c of config) {
        if (!c.default && width <= c.bp) rows = c.rows;
      }
      if (rows === void 0) return 0;
      return rows;
    }
    function getItemsPerRow() {
      const computed = getComputedStyle(body);
      if (computed.gridTemplateColumns && computed.gridTemplateColumns !== "none") {
        const gridCols = computed.gridTemplateColumns.split(" ").filter(Boolean);
        return gridCols.length || 1;
      }
      const first = items[0];
      if (!first) return 1;
      const parentWidth = body.clientWidth || body.getBoundingClientRect().width;
      const itemWidth = first.getBoundingClientRect().width || first.offsetWidth || 1;
      return Math.max(1, Math.floor(parentWidth / itemWidth));
    }
    function updateVisibleItems(reset = true) {
      if (!body || !button) return;
      itemsPerRow = getItemsPerRow();
      const rowsToShow = getRowsToShow();
      if (rowsToShow === 0) {
        items.forEach((item) => item.style.display = "");
        button.style.display = "none";
        return;
      }
      if (reset) currentRows = rowsToShow;
      const visibleCount = currentRows * itemsPerRow;
      items.forEach((item, i) => {
        item.style.display = i < visibleCount ? "" : "none";
      });
      button.style.display = visibleCount >= items.length ? "none" : "";
    }
    const isShowAllMode = block.hasAttribute("data-fls-showmore-all");
    if (isShowAllMode) {
      let expanded = false;
      const originalUpdate = updateVisibleItems;
      updateVisibleItems = function(reset = true) {
        originalUpdate(reset);
        button.style.display = "";
      };
      updateVisibleItems(true);
      button.addEventListener("click", () => {
        expanded = !expanded;
        button.classList.toggle("_showmore-active", expanded);
        if (expanded) {
          items.forEach((item) => item.style.display = "");
        } else {
          updateVisibleItems(true);
        }
      });
      window.addEventListener("resize", () => {
        if (expanded) items.forEach((item) => item.style.display = "");
        else updateVisibleItems(true);
      });
      return;
    }
    button.addEventListener("click", () => {
      currentRows += getRowsToShow();
      updateVisibleItems(false);
    });
    window.addEventListener("resize", () => updateVisibleItems());
    updateVisibleItems();
  });
}
window.addEventListener("load", showMore);

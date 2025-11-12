import "./app.min.js";
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
    function parseShowmoreConfig(value) {
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
      let rows = config.find((c) => c.default)?.rows || 2;
      for (const c of config) {
        if (!c.default && width <= c.bp) rows = c.rows;
      }
      return rows;
    }
    function getItemsPerRow() {
      const computed = getComputedStyle(body);
      const gridCols = computed.gridTemplateColumns.split(" ");
      return gridCols.length || 1;
    }
    function updateVisibleItems(reset = true) {
      itemsPerRow = getItemsPerRow();
      const rowsToShow = getRowsToShow();
      if (reset) currentRows = rowsToShow;
      const visibleCount = currentRows * itemsPerRow;
      items.forEach((item, i) => {
        item.style.display = i < visibleCount ? "" : "none";
      });
      button.style.display = visibleCount >= items.length ? "none" : "";
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

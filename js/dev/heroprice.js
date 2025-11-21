function syncHeadTables() {
  const mobile = window.innerWidth <= 1199.98;
  document.querySelectorAll(".tabs-hero-price__body").forEach((body) => {
    const rows = body.querySelectorAll(".head-table__item");
    if (rows.length < 2) return;
    const main = [...rows[0].querySelectorAll("th")].map((th) => th.dataset.original ??= th.textContent);
    rows.forEach((row, i) => {
      [...row.querySelectorAll("th")].forEach((cell, j) => {
        cell.dataset.original ??= cell.textContent;
        cell.textContent = mobile && i ? main[j] : cell.dataset.original;
      });
    });
  });
}
["DOMContentLoaded", "resize"].forEach((e) => window.addEventListener(e, syncHeadTables));
function updateHeadTableItemHidden() {
  document.querySelectorAll(".head-table__item").forEach((item) => {
    const hasText = [...item.querySelectorAll("th")].some((th) => th.textContent.trim());
    item.classList.toggle("head-table__item--hidden", !hasText);
  });
}
["DOMContentLoaded", "resize"].forEach(
  (evt) => window.addEventListener(evt, updateHeadTableItemHidden)
);
function updateHeaderHeight() {
  document.querySelectorAll(".hero-price__item").forEach((item) => {
    const head = item.querySelector(".head-table__item");
    const subtitle = item.querySelector(".hero-price__sub-title");
    if (!head || !subtitle) return;
    if (head.classList.contains("head-table__item--hidden")) {
      subtitle.style.marginTop = "";
    } else {
      subtitle.style.marginTop = head.offsetHeight + "px";
    }
  });
}
["DOMContentLoaded", "resize"].forEach(
  (evt) => window.addEventListener(evt, updateHeaderHeight)
);
function handleHeroPriceAlone() {
  document.querySelectorAll(".hero-price__item").forEach((item) => {
    const row = item.querySelector(".body-table__item");
    const sub = item.querySelector(".hero-price__sub-title");
    if (!sub || !row || item.querySelectorAll(".body-table__item").length !== 1) {
      item.classList.remove("hero-price__item--alone");
      return;
    }
    item.classList.add("hero-price__item--alone");
    const td = row.querySelector("td");
    if (td) td.textContent = window.innerWidth <= 1199.98 ? sub.textContent : "";
  });
}
["DOMContentLoaded", "resize"].forEach((e) => window.addEventListener(e, handleHeroPriceAlone));
function initScrollHint() {
  document.querySelectorAll("[data-fls-scrollhint]").forEach((el) => {
    const update = () => {
      const vertical = el.scrollHeight > el.clientHeight;
      const pos = vertical ? el.scrollTop : el.scrollLeft;
      const max = vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
      el.classList.toggle("scroll-visible-start", pos > 1);
      el.classList.toggle("scroll-visible-end", pos < max - 1);
    };
    el.addEventListener("scroll", update);
    update();
  });
}
initScrollHint();
["resize"].forEach((evt) => window.addEventListener(evt, initScrollHint));

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
  if (window.innerWidth < 1200) {
    document.querySelectorAll(".hero-price__sub-title").forEach((sub) => {
      sub.style.marginTop = "";
    });
    return;
  }
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
    if (item.classList.contains("hero-price__item--center")) {
      item.classList.remove("hero-price__item--alone");
      return;
    }
    if (row && row.classList.contains("body-table__item--alone")) {
      item.classList.remove("hero-price__item--alone");
      return;
    }
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
  document.querySelectorAll("[data-fls-scrollhint]").forEach((wrapper) => {
    const body = wrapper.querySelector("[data-fls-scrollhint-body]");
    if (!body) return;
    const update = () => {
      const vertical = body.scrollHeight > body.clientHeight;
      const pos = vertical ? body.scrollTop : body.scrollLeft;
      const max = vertical ? body.scrollHeight - body.clientHeight : body.scrollWidth - body.clientWidth;
      wrapper.classList.toggle("scroll-visible-start", pos > 1);
      wrapper.classList.toggle("scroll-visible-end", pos < max - 1);
    };
    body.addEventListener("scroll", update);
    update();
  });
}
initScrollHint();
window.addEventListener("resize", initScrollHint);

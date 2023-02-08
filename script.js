const sidebar = document.querySelector(".sidebar");
const header = document.querySelector(".head");
const general = document.querySelector("head");
const body = document.querySelector("body");
let theme = "night";

const widthScreen = window.matchMedia("(max-width: 767px)");

const connectPages = (path, el) => {
  fetch(`${path}`)
    .then((res) => res.text())
    .then((data) => {
      el.innerHTML = data;
    });
};

const shareHeader = function () {
  connectPages("/sharedFiles/header.html", header);
};
const shareSidebar = function () {
  connectPages("/sharedFiles/sidebar.html", sidebar);
};
document.addEventListener("DOMContentLoaded", () => {
  shareHeader();
  shareSidebar();
  screenChanged(widthScreen);
  theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : theme;
  console.log(localStorage.getItem("theme"));
  if (theme == "day") body.classList.remove("dark");
  else if (theme == "night") body.classList.add("dark");

  console.log("loaded");
  const currentPage = document
    .querySelector(".page-name")
    .innerHTML.toLowerCase();
  waitForElm(`.${currentPage}`).then((elm) => {
    categories_btn = document.querySelector(".catg-btn");
    categories_btn.addEventListener("click", () =>
      sidebar.classList.toggle("lessen")
    );
    elm.classList.add("active");
    console.log(elm);

    const theme_btn = document.querySelector(".theme");
    updateButtonTheme(theme_btn, theme);

    theme_btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("day");
        updateButtonTheme(theme_btn, "day");
      } else {
        body.classList.add("dark");
        body.classList.remove("day");
        updateButtonTheme(theme_btn, "night");
      }
    });

    const toggleSearch = document.querySelector(".form-group");
    const Search_box = document.querySelector(".form");
    const min_btn = document.querySelector(".min-btn");
    toggleSearch.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(Search_box.classList.contains("min-mobile"));
      if (!Search_box.classList.contains("min-mobile")) return;
      Search_box.classList.remove("min-mobile");
      min_btn.style.display = "flex";
    });
    min_btn.addEventListener("click", function (e) {
      e.preventDefault;
      Search_box.classList.add("min-mobile");
      min_btn.style.display = "none";
    });
  });
});

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
function updateButtonTheme(btn, theme) {
  btn.classList.remove("day");
  btn.classList.remove("night");
  btn.classList.add(`${theme}`);
  localStorage.setItem("theme", `${theme}`);
}
function screenChanged(width) {
  width.matches
    ? sidebar.classList.add("lessen")
    : sidebar.classList.remove("lessen");
}
widthScreen.addEventListener("change", screenChanged);

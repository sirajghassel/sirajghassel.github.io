document.getElementById("year").textContent = new Date().getFullYear();

// Theme: follows the system setting until the user picks one with the toggle
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}
function syncThemeButton() {
  const dark = currentTheme() === "dark";
  themeBtn.textContent = dark ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
  syncThemeButton();
});
systemDark.addEventListener("change", syncThemeButton);
syncThemeButton();

const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", false);
});

// Highlight the nav link for the section currently in view
const links = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section").forEach((s) => observer.observe(s));

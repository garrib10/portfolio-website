const DARK_MODE_KEY = "portfolio-dark-mode";

function applySavedTheme() {
  const savedMode = localStorage.getItem(DARK_MODE_KEY);

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const shouldUseDarkMode =
    savedMode === "enabled" || (savedMode === null && prefersDarkMode);

  document.body.classList.toggle("dark-mode", shouldUseDarkMode);

  updateThemeButton(shouldUseDarkMode);
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark-mode");

  localStorage.setItem(DARK_MODE_KEY, isDarkMode ? "enabled" : "disabled");

  updateThemeButton(isDarkMode);
}

function updateThemeButton(isDarkMode) {
  const toggleButton = document.querySelector(".toggle-btn");

  if (!toggleButton) {
    return;
  }

  const icon = toggleButton.querySelector("i");
  const label = toggleButton.querySelector("span");

  toggleButton.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode",
  );

  if (icon) {
    icon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
  }

  if (label) {
    label.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  }
}

function updateActiveNavigationLink() {
  const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sections = Array.from(navigationLinks)
    .map((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return null;
      }

      return document.querySelector(href);
    })
    .filter((section) => section !== null);

  let activeSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 140) {
      activeSectionId = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.querySelector(".toggle-btn");

  themeToggleButton?.addEventListener("click", toggleDarkMode);

  applySavedTheme();
  updateActiveNavigationLink();
});

window.addEventListener("scroll", updateActiveNavigationLink, {
  passive: true,
});

const DARK_MODE_KEY = "portfolio-dark-mode";

const THEME_ICON_VIEWBOXES = {
  moon: "0 0 384 512",
  sun: "0 0 512 512",
};

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

  const icon = toggleButton.querySelector("svg");
  const label = toggleButton.querySelector("span");

  toggleButton.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode",
  );

  if (icon) {
    const iconName = isDarkMode ? "sun" : "moon";

    icon.setAttribute("class", `icon fa-${iconName}`);
    icon.setAttribute("viewBox", THEME_ICON_VIEWBOXES[iconName]);
    icon
      .querySelector("use")
      ?.setAttribute("href", `assets/icons/icons.svg#${iconName}`);
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
      link.setAttribute("aria-current", "true");
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

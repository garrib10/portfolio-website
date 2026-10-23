const DARK_MODE_KEY = "portfolio-dark-mode";

const THEME_ICON_VIEWBOXES = {
  moon: "0 0 384 512",
  sun: "0 0 512 512",
};

// Storage can throw (private browsing, blocked site data); the theme still works without it.
function readSavedTheme() {
  try {
    return localStorage.getItem(DARK_MODE_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(isDarkMode) {
  try {
    localStorage.setItem(DARK_MODE_KEY, isDarkMode ? "enabled" : "disabled");
  } catch (error) {
    // The choice simply won't persist across visits.
  }
}

function applySavedTheme() {
  const savedMode = readSavedTheme();

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

  saveTheme(isDarkMode);

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

function initActiveNavigation() {
  const navigationLinks = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]'),
  );

  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section !== null);

  let frameRequested = false;

  function updateActiveNavigationLink() {
    frameRequested = false;

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

  // Measure at most once per animation frame instead of on every scroll event.
  window.addEventListener(
    "scroll",
    () => {
      if (!frameRequested) {
        frameRequested = true;
        window.requestAnimationFrame(updateActiveNavigationLink);
      }
    },
    { passive: true },
  );

  updateActiveNavigationLink();
}

// Submit the contact form in the background and report the result inline.
// Without JavaScript the form still posts to Formspree normally.
function initContactForm() {
  const form = document.querySelector(".contact-form");
  const status = form?.querySelector(".form-status");
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!form || !status || !submitButton) {
    return;
  }

  const defaultButtonText = submitButton.textContent;

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    showStatus("", "");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        showStatus("Thanks! Your message was sent. I’ll get back to you soon.", "success");
        return;
      }

      // Formspree returns e.g. { field: "email", message: "should be an email" }.
      const data = await response.json().catch(() => ({}));
      const details = Array.isArray(data.errors)
        ? data.errors
            .map(({ field, message }) => {
              const text = field ? `${field} ${message}` : message;
              return `${text.charAt(0).toUpperCase()}${text.slice(1)}.`;
            })
            .join(" ")
        : "";

      showStatus(
        `Sorry, your message couldn’t be sent. ${details || "Please try again, or reach me on LinkedIn."}`,
        "error",
      );
    } catch (error) {
      showStatus(
        "Sorry, your message couldn’t be sent. Please check your connection and try again, or reach me on LinkedIn.",
        "error",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.querySelector(".toggle-btn");

  themeToggleButton?.addEventListener("click", toggleDarkMode);

  applySavedTheme();
  initActiveNavigation();
  initContactForm();
});

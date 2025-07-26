function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Nav tab switching code
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav a.tab-link");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Scroll smoothly to section linked by href
      const targetId = tab.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

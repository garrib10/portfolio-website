function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav a.tab-link");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const targetId = tab.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

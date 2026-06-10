// Smooth scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector("header").offsetHeight;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        10;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// Highlight nav on scroll
const sections = document.querySelectorAll("section[id], main[id]");
const navLinks = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current)
      link.classList.add("active");
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const headerNav = document.getElementById("headerNav");

if (mobileMenuToggle && headerNav) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    headerNav.classList.toggle("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (headerNav.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!headerNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      headerNav.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerNav.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });
}

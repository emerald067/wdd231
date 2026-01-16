const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");
    
    // Update aria-expanded for accessibility
    const isExpanded = nav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isExpanded);
  });
  
  // Close menu when clicking outside on mobile
  document.addEventListener("click", (event) => {
    if (window.innerWidth < 768 && 
        nav.classList.contains("open") && 
        !nav.contains(event.target) && 
        !menuButton.contains(event.target)) {
      nav.classList.remove("open");
      menuButton.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  
  // Close menu when window is resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove("open");
      menuButton.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
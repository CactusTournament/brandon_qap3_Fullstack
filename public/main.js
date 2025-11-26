document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popupMessage");
  if (!popup) return;

  // Hide after 3 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(20px)";
    setTimeout(() => popup.remove(), 300);
  }, 3000);
});

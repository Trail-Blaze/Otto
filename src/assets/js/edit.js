// Set delay on script as we know people still use Blaze on potato PCs * cough * * cough *
setTimeout(() => {
  const edit = document.getElementById("edit");
  const dropdown = document.getElementById("dropdown");
  const dropdown_c = document.getElementById("dropdown_cont");

  edit.addEventListener("click", () => {
    if (dropdown.classList.contains("hidden")) {
      setTimeout(() => {
        dropdown.classList.remove("hidden");
      }, 100);
      dropdown_c.style.height = "200px";
      window.scroll({
        top: document.documentElement.scrollTop + 180,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    dropdown.classList.add("hidden");
    dropdown_c.style.height = "1px";
  });
}, 5000);

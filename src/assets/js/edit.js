// Set delay on script as we know people still use Blaze on potato PCs * cough * * cough *
setTimeout(() => {
  const edit = document.getElementById("edit");
  const dropdown = document.getElementById("dropdown");
  const dropdown_c = document.getElementById("dropdown_cont");
  edit.addEventListener("click", () => {
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      dropdown_c.style.height = "1px";
    } else {
      dropdown.classList.add("hidden");
      dropdown_c.style.height = "200px";
    }
  });
}, 5000);

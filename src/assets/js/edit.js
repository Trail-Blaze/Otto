// Set delay on script as we know people still use Blaze on potato PCs * cough * * cough *
setTimeout(() => {
  const edit = document.getElementById("edit");
  const dropdown = document.getElementById("dropdown");
  edit.addEventListener("click", () => {
    if (dropdown.classList.includes("hidden")) {
      dropdown.classList.remove("hidden");
    } else {
      dropdown.classList.add("hidden");
    }
  });
}, 550);

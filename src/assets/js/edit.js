// Set delay on script as we know people still use Blaze on potato PCs * cough * * cough *
setTimeout(() => {
  // Commit #134 - Add support to more entries
  const edit = document.querySelector('[id^="edit_"]').id;
  const dropdown = document.querySelector('[id^="dropdown_"]').id;
  const dropdown_c = document.querySelector('[id^="dropdown_cont_"]').id;

  edit.addEventListener("click", () => {
    // If hidden...
    if (dropdown.classList.contains("hidden")) {
      // Wait 100ms...
      setTimeout(() => {
        // Make dropdown visible
        dropdown.classList.remove("hidden");
      }, 100);
      // Stretch UI pane to fit dropdown...
      dropdown_c.style.height = "200px";
      // Scroll till visible
      window.scroll({
        // Current-Y scroll position + 180px
        top: document.documentElement.scrollTop + 180,
        left: 0,
        behavior: "smooth",
      });
      // Exit
      return;
    }
    // Otherwise hide dropdown
    dropdown.classList.add("hidden");
    // ...and reset UI pane height to default
    dropdown_c.style.height = "1px";
  });
}, 5000);

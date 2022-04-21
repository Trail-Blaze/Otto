const darkModeTheme = "#1a1a1a";
const darkModeTheme__sidebar = "#2e2d2d";
sw_theme();
function sw_theme() {

    const main = document.getElementById("main");
    const sidebar = document.getElementById("sidebar");
    try {
      switch (launcherConfig.theme) {
        case "dark":
          // Body
          main.style = "color: #fcfcfc;";
          main.style.background = darkModeTheme;
          document.body.background = darkModeTheme;
          // Sidebar
          try {
            sidebar.style.background = darkModeTheme__sidebar;
          } catch (e) {
            try {
              document.getElementById("drag0").style.background =
                darkModeTheme__sidebar;
            } catch (e) {
              sw_theme();
            }
          }
          break;
        case "light":
          // main.style.background = "blue";
          break;
        default:
          console.warn("[THEMEMAN] INVALID THEME SELECTION!");
          break;
      }
    } catch (error) {
     setTimeout(()=>{
      sw_theme();
     }, 100);
    }

}

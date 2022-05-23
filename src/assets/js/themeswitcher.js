const darkModeTheme = "#1a1a1a";
const darkModeTheme__sidebar = "#2e2d2d";
const darkModeTheme_color = "#fcfcfc";
let theme = path.join(launcherConfig.base, "/userAssets/", "theme.json");
let themeContent;
let themeNav;
let themeColor;

if (fs__nav.existsSync(theme)) {
  theme = require(theme);
  themeContent = theme.content;
  themeNav = theme.nav;
  themeColor = theme.text;
}
/*
if(fs.existsSync(theme.json)){

theme = require(theme.json);
themeContent = theme.content;
themeNav = theme.nav;
themeColor = theme.text;

}
 */

sw_theme();
function sw_theme() {
  const main = document.getElementById("main");
  const sidebar = document.getElementById("sidebar");
  try {
    switch (launcherConfig.theme) {
      case "dark":
        // Body
        main.style = `color: ${darkModeTheme_color}`;
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
      case "custom":
        if (theme.content != undefined) {
          // Content
          main.style.background = themeContent;
          document.body.background = themeContent;
          // Nav
          try {
            sidebar.style.background = themeNav;
          } catch (e) {
            try {
              document.getElementById("drag0").style.background = themeNav;
            } catch (e) {
              sw_theme();
            }
          }
          // Text
          main.style = `color: ${themeColor}`;
        }
        break;
      default:
        console.warn("[THEMEMAN] INVALID THEME SELECTION!");
        break;
    }
  } catch (error) {
    setTimeout(() => {
      sw_theme();
    }, 100);
  }
}

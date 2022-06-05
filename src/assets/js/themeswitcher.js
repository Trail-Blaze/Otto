const darkModeTheme = "#1a1a1a";
const darkModeTheme__sidebar = "#2e2d2d";
const darkModeTheme_color = "#fcfcfc";
let theme;
let themeContent;
let themeNav;
let themeColor;
let run = 1;
let run_t = 1;
function requireTheme() {
  try {
    theme = path.join(launcherConfig.base, "/userAssets/", "theme.json");
  } catch (error) {
    if (run > 100) return;
    console.warn(error);
    setTimeout(() => {
      requireTheme();
      run++;
    }, 100);
  }
  if (fs__nav.existsSync(theme)) {
    try {
      theme = require(theme);
    } catch (error) {
      if (run > 100) return;
      setTimeout(() => {
        console.warn(error);
        requireTheme();
        run++;
      }, 300);
    }
    themeContent = theme.content;
    themeNav = theme.nav;
    themeColor = theme.text;
  }
}
/*
if(fs.existsSync(theme.json)){

theme = require(theme.json);
themeContent = theme.content;
themeNav = theme.nav;
themeColor = theme.text;

}
 */
requireTheme();
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
        document.body.style.background = darkModeTheme;
        // Sidebar
        try {
          sidebar.style.background = darkModeTheme__sidebar;
        } catch (e) {
          try {
            document.getElementById("drag0").style.background =
              darkModeTheme__sidebar;
          } catch (e) {
            if (run_t > 100) return;
            console.warn(error);

            run++;
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
          setTimeout(() => {
            main.style.background = themeContent;
          }, 100);

          try {
            document.body.style.background = themeContent;
          } catch (error) {
            console.warn(error);
          }
          // Nav
          try {
            sidebar.style.background = themeNav;
          } catch (e) {
            try {
              document.getElementById("drag0").style.background = themeNav;
            } catch (e) {
              if (run_t > 100) return;
              console.warn(error);

              run++;
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
    if (run_t > 100) return;
    console.warn(error);
    setTimeout(() => {
      run++;
      sw_theme();
    }, 100);
  }
}

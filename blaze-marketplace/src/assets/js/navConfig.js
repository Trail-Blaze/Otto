const os__nav = require("os");
const path__nav = require("path");
const fs__nav = require("fs");
let __drivename___nav =
  os__nav.platform == "win32" ? process.cwd().split(path__nav.sep)[0] : "/";
let blazeDir__nav = path__nav.join(__drivename___nav, "/Blaze/");
const configPath = path__nav.join(blazeDir__nav, "/Launcher/");
let x = 1;
let navConfig;

(function createConfig() {
  fs__nav.access(blazeDir__nav, function (error) {
    if (error) {
      fs__nav.mkdirSync(blazeDir__nav);
      console.log("Created New Blaze Dir!");
      createRepoDir();
    }
    fs__nav.access(configPath, function (error) {
      if (error) {
        fs__nav.mkdirSync(configPath);
        console.log("Created New Blaze/Launcher Dir!");

        fetch(
          "https://trail-blaze.github.io/marketplace/config/defaultNavConfig.json"
        )
          .then((response) => response.json())
          .then((data) => {
            navConfig = data;
            let navjson = JSON.stringify(navConfig, null, 2);
            fs__nav.writeFileSync(
              path__nav.join(configPath, "defaultNavConfig.json"),
              navjson,
              "utf-8"
            );
            createConfig();
          })
          .catch((err) => console.error(err));
      }
      if (
        fs__nav.existsSync(path__nav.join(configPath, "defaultNavConfig.json"))
      ) {
        navConfig = require(path__nav.join(
          configPath,
          "defaultNavConfig.json"
        ));
        setNav();
      }
      if (
        !fs__nav.existsSync(path__nav.join(configPath, "defaultNavConfig.json"))
      ) {
        fetch(
          "https://trail-blaze.github.io/marketplace/config/defaultNavConfig.json"
        )
          .then((response) => response.json())
          .then((data) => {
            navConfig = data;
            let navjson = JSON.stringify(navConfig, null, 2);
            fs__nav.writeFileSync(
              path__nav.join(configPath, "defaultNavConfig.json"),
              navjson,
              "utf-8"
            );
            navConfig = require(path__nav.join(
              configPath,
              "defaultNavConfig.json"
            ));
            setNav();
          })
          .catch((err) => console.error(err));
      }
    });
  });
})();

function setNav() {
  populateNav();
}

/*
 *
 * USAGE [ populateCatalog(listlength, entry, classListArray, entryTemplate, uniqueID, counterTemplateExists)]
 *
 * listlength = How long does the package list have to be?
 * entry = EntryPoint. Where does the list have to be placed
 * classListArray = What classes has to be applied to the entries?
 * entryTemplate = What compatible template must be added to the entry elements?
 * uniqueId = Only use this only if you have more than one list on the page (OPTIONAL)
 * counterTemplateExists = Use this if you want to have a counter on the page
 *
 *
 */
function populateNav() {
  // console.log(counter);
  while (x <= navConfig.navProps.navElements) {
    // Create Entry
    let sideBarEntry = document.createElement("a");
    sideBarEntry.href = navConfig.navElements[`nlink${x}`].hyperLinksTo;
    const entryList = document.getElementById("iconContainer");
    sideBarEntry.setAttribute("id", `sidebarElement__${x}`);

    entryList.appendChild(sideBarEntry);

    // Access Newly Created Entry and Edit it To Our Needs
    const newEntry = document.getElementById(`sidebarElement__${x}`);
    newEntry.innerHTML = document.getElementById("sideBarTemplate").innerHTML;

    const iconEntry = document.getElementById("fa");
    iconEntry.classList = navConfig.navElements[`nlink${x}`].icon;
    iconEntry.id = "";

    // Set Package Icon
    changeID("sideBarText", `sideBarText__${x}`);
    sideBarText = document.getElementById(`sideBarText__${x}`);
    sideBarText.innerText = navConfig.navElements[`nlink${x}`].displayText;
    x++;
  }
}

function changeID(oldid, newID) {
  e = document.getElementById(oldid.toString());
  e.id = newID;
}

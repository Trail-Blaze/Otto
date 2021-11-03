// aboutOtto.js
const { ipcRenderer } = require("electron");
require("v8-compile-cache");
const ipc = ipcRenderer;
const os_2 = require("os");
const fs = require("fs");
const path = require("path");
const YAML = require('yaml');
let __drivename =
  os_2.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/");
const configDir = path.join(blazeDir, "/Launcher/backend/");
const bConfig = fs.readFileSync(path.join(configDir, "bak-release"), 'utf8')
let backConfig = YAML.parse(bConfig);
let repo;

fetch("https://trail-blaze.github.io/scoop/scoop_repo.json")
  .then((response) => response.json())
  .then((data) => {
    repo = data;
    setContent();
  })
  .catch((err) => console.error(err));

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // Function that specializes in replacing text in the DOM with whatever we specify
  // Usage: replaceText(selectorID, text);
  // Example replaceText("#test", "Test Text");

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // As soon as the window loads, we request the version number of the application from the main process

  ipc.send("reqVer");

  // Set backend version

  replaceText("bac-ver", `${backConfig.dist_name} ${backConfig.rel}`);
  replaceText("bac-type", `${backConfig.type}`);
  replaceText("boot", `${backConfig.boot}`);

  // Recieve Version

  ipc.on("full_version", (event, data) => {
    try {
      document.getElementById("cli-ver").innerHTML = data;
    } catch (error) {
      console.warn("Failed to set some variables!");
    }
  });
  function matchRuleShort(str, rule) {
    var escapeRegex = (str) =>
      str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(
      "^" + rule.split("*").map(escapeRegex).join(".*") + "$"
    ).test(str);
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(
      `${dependency}-version`,
      `${dependency}: ${process.versions[dependency]}`
    );
  }
  function ostype() {
    let osType = process.platform;
    switch (osType) {
      case "win32":
        return `WindowsNT ${os_2.release}`;

      case "darwin":
        function darwin_mappings() {
          let darwinver = os_2.release();
          if (matchRuleShort(`${darwinver}`, "0.*")) {
            return "X Server";
          } else if (matchRuleShort(`${darwinver}`, "6.*")) {
            return "X Jaguar";
          } else if (matchRuleShort(`${darwinver}`, "7.*")) {
            return "X Panther";
          } else if (matchRuleShort(`${darwinver}`, "8.*")) {
            return "X Tiger";
          } else if (matchRuleShort(`${darwinver}`, "9.*")) {
            return "X Leopard";
          } else if (matchRuleShort(`${darwinver}`, "10.*")) {
            return "X Snow Leopard";
          } else if (matchRuleShort(`${darwinver}`, "11.*")) {
            return "X Lion";
          } else if (matchRuleShort(`${darwinver}`, "12.*")) {
            return "X Mountain Lion";
          } else if (matchRuleShort(`${darwinver}`, "13.*")) {
            return "X Mavericks";
          } else if (matchRuleShort(`${darwinver}`, "14.*")) {
            return "X Yosemite";
          } else if (matchRuleShort(`${darwinver}`, "15.*")) {
            return "X El Captain";
          } else if (matchRuleShort(`${darwinver}`, "16.*")) {
            return "Sierra";
          } else if (matchRuleShort(`${darwinver}`, "17.*")) {
            return "High Sierra";
          } else if (matchRuleShort(`${darwinver}`, "18.*")) {
            return "Mojave";
          } else if (matchRuleShort(`${darwinver}`, "19.*")) {
            return "Catalina";
          } else if (matchRuleShort(`${darwinver}`, "20.*")) {
            return "Big Sur";
          } else if (matchRuleShort(`${darwinver}`, "21.*")) {
            return "Monterey";
          }
          switch (darwinver) {
            case "1.0":
              return "X Developer Preview 3";

            case "1.1":
              return "X Developer Preview 4";

            case "1.2.1":
              return "X Kodiak";

            case "1.3.1":
              return "Cheetah";

            case "1.4.1":
              return "X Puma";

            case "5.1":
              return "X Puma";

            case "5.5":
              return "X Puma";

            default:
              return `${darwinver}`;
          }
        }
        return `MacOS X ${darwin_mappings()}`;

      case "linux":
        return `Linux Kernel ${os_2.release}`;

      case "aix":
        return `IBM AIX ${os_2.release}`;

      case "freebsd":
        return `FreeBSD ${os_2.release}`;

      case "openbsd":
        return `OpenBSD ${os_2.release}`;

      case "sunos":
        return `SunOS ${os.release}`;

      case "android":
        
        function android_mappings() {
          let androidver = os.release();
          if (matchRuleShort(`${androidver}`, "2.*")) {
            return "Eclair";
          } else if (matchRuleShort(`${androidver}`, "3.*")) {
            return "Honeycomb";
          } else if (matchRuleShort(`${androidver}`, "4.0.*")) {
            return "Ice Cream Sandwich";
          } else if (matchRuleShort(`${androidver}`, "4.1.*")) {
            return "Ice Cream Sandwich";
          } else if (matchRuleShort(`${androidver}`, "4.2.*")) {
            return "Jelly Bean";
          } else if (matchRuleShort(`${androidver}`, "4.4.*")) {
            return "KitKat";
          } /*else if (matchRuleShort(`${androidver}`, "4.4W.*")) {
            return "KitKat Wearable";
          }*/ else if (
            matchRuleShort(`${androidver}`, "5.0.*")
          ) {
            return "Lollipop";
          } else if (matchRuleShort(`${androidver}`, "6.*")) {
            return "Marshmallow";
          } else if (matchRuleShort(`${androidver}`, "7.*")) {
            return "Nougat";
          } else if (matchRuleShort(`${androidver}`, "8.*")) {
            return "Oreo";
          } else if (matchRuleShort(`${androidver}`, "9.*")) {
            return "Pie";
          } else if (matchRuleShort(`${androidver}`, "10.*")) {
            return "Queen Cake";
          } else if (matchRuleShort(`${androidver}`, "11.*")) {
            return "Red Velvet Cake";
          } else if (matchRuleShort(`${androidver}`, "12.*")) {
            return "Snow Cone";
          } else if (matchRuleShort(`${androidver}`, "813.*")) {
            return "Tiramisu";
          }

          switch (androidver) {
            case "1.0":
              return "v1.0";

            case "1.1":
              return "v1.1";

            case "1.5":
              return "Cupcake";

            case "1.6":
              return "Donut";

            case "4.0":
              return "Ice Cream Sandwich";

            case "4.2":
              return "Jelly Bean";

            case "4.3":
              return "Jelly Bean";

            case "4.3.1":
              return "Jelly Bean";

            case "4.4":
              return "KitKat";

            case "5.0":
              return "Lollipop";
            /*case "2.0":
              return "Eclair";*/

            case "5.1":
              return "Lollipop";

            case "5.1.1":
              return "Lollipop";

            default:
              return `Android Version ${androidver}`;
          }
        }
        return `Android ${android_mappings()}`;

      default:
        return "Other OS";
    }
  }

  replaceText("os-type", ostype());
});

function setContent() {
  document.getElementById(
    "rep-tot-able"
  ).innerText = `${repo.repoProps.total_packages} Modules`;
}

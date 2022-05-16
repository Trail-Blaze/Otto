const { remote } = require("electron");
const { dialog } = remote;
const path = require("path");
const fs = require("fs");
const os = require("os");
const { count } = require("console");
let win = remote.getCurrentWindow();
const logonAs = document.getElementById("selectLogin");
const distName = document.getElementById("distName");
const logonAs__text = document.getElementById("logonDisp");
const fnPath = document.getElementById("selectPath");
const changeableIcon = document.getElementById("changeableIcon");
const textPath = document.getElementById("typePath");
const errMsg = document.getElementById("err@Warn");
const finishUp = document.getElementById("finishUp");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
navConfig = require(path.join(
  blazeDir,
  "defaultNavConfig.json"
));
let logonName;
let dirName;
let fileName;
let counter = 0;
let counterAffirmative = false;
let errCount = 0;

let installList = {
  InstallList: {},
};

if (fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  installList = require(path.join(userAssetsDir, "\\InstallList.json"));
  document.getElementById("completionBack").classList.remove("hidden");
}

affirmCounter();
installList.InstallList[`${counter}`] = {};

fnPath.addEventListener("click", async () => {
  const file = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  if (!file) return;
  if (file) dirName = file.filePaths[0];
  dirName = path.join(dirName, "\\FortniteGame\\Binaries\\Win64\\");
  console.log(dirName);
  installList.InstallList[`${counter}`].location = dirName;
  textPath.value = dirName;
});

finishUp.addEventListener("click", async () => {
  if (
    !installList.InstallList[`${counter}`].location ||
    !installList.InstallList[`${counter}`].name ||
    !installList.InstallList[`${counter}`].logonAs
  ) {
    if (errCount > 0) {
      window.location.replace("index.html");
      writeNav();
    }
    errMsg.innerText =
      "Error: Your installation is missing some configuration. If you still want to continue, press the button one more time.";
    errCount = errCount + 1;
    return;
  }

  if (!fs.existsSync(userAssetsDir)) {
    fs.mkdirSync(userAssetsDir);
  }
  data = JSON.stringify(installList, null, 3);
  fs.writeFile(
    path.join(userAssetsDir, "InstallList.json"),
    data,
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
  writeNav();
  window.location.replace("boot.html");
});

changeableIcon.addEventListener("click", async () => {
  const file = await dialog.showOpenDialog(win, {
    properties: ["openFile"],
    filters: [
      { name: "Pictures", extensions: ["png", "jpg", "jpeg", "apng", "gif", "bmp", "svg", "webp"] },
    ],
  });
  if (!file) return;
  if (file) fileName = file.filePaths[0];
  fileName = path.join(fileName);
  console.log(`ICON: ${fileName}. Rerouting...`);

  if (!fs.existsSync(userAssetsDir)) {
    fs.mkdirSync(userAssetsDir);
  }

  let destDir = path.join(
    userAssetsDir,
    `${counter.toString()}.${fileName.split(".").pop()}`
  );
  fs.copyFile(fileName.toString(), destDir, (err) => {
    if (err) throw err;

    console.log(`ICON: SUCCESS! [(${fileName}) --> (${destDir})]`);
    changeableIcon.src = destDir;
    installList.InstallList[`${counter}`].icon = destDir;
  });
});

logonAs.addEventListener("keyup", async () => {
  logonName = logonAs.value;
  if (
    logonName === undefined ||
    logonName === null ||
    !logonName.replace(/\s/g, "").length
  )
    return;
  console.log(`LOGON: ${logonName}`);
  installList.InstallList[`${counter}`].logonAs = logonName;
  logonAs__text.innerText = logonName.toString();
});

textPath.addEventListener("keyup", async () => {
  if (
    textPath.value === undefined ||
    textPath.value === null ||
    !textPath.value.replace(/\s/g, "").length
  )
    return;
  dirName = path.join(textPath.value, "\\\\");
  console.log(`PATH: ${dirName}`);
  installList.InstallList[`${counter}`].location = dirName;
});

distName.addEventListener("keyup", async () => {
  if (
    distName.value === undefined ||
    distName.value === null ||
    !distName.value.replace(/\s/g, "").length
  )
    return;
  let distName__text = distName.value;
  console.log(`DISTNAME: ${distName__text}`);
  installList.InstallList[`${counter}`].name = distName__text;
});

function affirmCounter() {
  if (!counterAffirmative) {
    if ((Object.keys(installList.InstallList).length - 1) === counter || (Object.keys(installList.InstallList).length - 1) > counter) {
      counter++;
      affirmCounter();
    } else {
      counterAffirmative = true;
      return;
    }
  }
}

function writeNav() {
  if (counter > 0) return;
  navConfig.navElements.nlink1.displayText = "Boot";
  navConfig.navElements.nlink1.icon = "fas fa-play";
  let navjson = JSON.stringify(navConfig, null, 2);

  fs.writeFile(
    path.join(blazeDir, "defaultNavConfig.json"),
    navjson,
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
}

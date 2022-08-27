// This script always runs throughout the entire lifespan of the app
const { app } = require("@electron/remote");
const fs = require("fs");
const path = require("path");
const os = require("os");
const getmac = require("getmac");
// Guard Filter
const OTPAuth = require("otpauth");
const networkServer = "https://express-ban.vercel.app/launcher/echo";
const _SF5 = '2xe66432';
const _DER2 = "26JMC"
const _AE1 = "7ad";
const _f3_ = 'p625kp';

// Create a new TOTP object.
let totp = new OTPAuth.TOTP({
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: ("7C4U77" + _SF5 + _DER2 + _AE1 + _f3_ + "cf5z").toUpperCase(),
});

/////

let echoRequest = {
  activity_state: "ACTIVE",
  lastState: window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  ),
  ip: (async () => {
    await fetch("https://myexternalip.com/raw", {
      method: "GET",
    })
      .then((res) => res.text())
      .then((res) => {
        echoRequest.ip = res;
      });
  })(),
  // "discord": DISCORDJS_GRAB_TAG,
  provinceDetails: (async () => {
    await fetch("https://myexternalip.com/raw", {
      method: "GET",
    })
      .then((res) => res.text())
      .then(async (res) => {
        await fetch(`http://ip-api.com/json/${res}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            echoRequest.provinceDetails = res;
          });
      });
  })(),
  os: process.platform,
  arch: process.arch,
  mac: getmac.default(),
  uploadTime: new Date().toISOString(),
  installs: (() => {
    setTimeout(() => {
      if (typeof installList === "undefined") {
        echoRequest.installs = [];
      } else {
        echoRequest.installs = installList;
      }
    }, 5500);
  })(),
  version: app.getVersion().toString(),
};

let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

let baseDir = path.join(__drivename, "/Blaze/");
let configDir = path.join(baseDir, "/Launcher/");

let helpersDir = path.join(configDir, "/helpers/");
let backendDir = path.join(configDir, "/backend/");
let userAssetsDir = path.join(configDir, "/userAssets/");
let launcherConfig = require(path.join(configDir, "settings.json")); // Opening settings file for readOnly

ref = (id) => document.getElementById(id);

function openILL() {
  const { shell } = require("electron"); // deconstructing assignment
  shell.openPath(path.join(userAssetsDir, "\\InstallList.json")); // Show the given file in a file manager. If possible, select the file.
}

function dropInstall(position = ref(position)) {
  // Drop install at position "position"
  delete installList[position];
  // Remove from UI
  entryListAll.removeChild(ref(`install__${position}`));
  const filtered = installList.filter((e) => {
    return e != null;
  });
  installList = filtered;

  // Save file
  let data = JSON.stringify(installList, null, 3);
  fs.writeFile(
    path.join(userAssetsDir, "InstallList.json"),
    data,
    function (err) {
      if (err) {
        // Throw errors, if any
        console.log(err);
      }
    }
  );
}

setInterval(() => {
  amIbanned();
}, 6000); // Every 30s check if banned

function amIbanned() {
  // Send a post request to the server

  // Check our sanity

  fetch(networkServer, {
    method: "POST",
    body: JSON.stringify(echoRequest),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async function (res) {
      console.log(res.status);
      // Generate a new token
      const TOTPToken = totp.generate();
      switch (res.status) {
        case 200:
          await res.json().then((response) => {
            // Are we sane?
            if (totp.validate({ token: response.guard, window: 1 }) === null) {
              // If not we disable the launcher
              console.error(
                "GUARD DIED PREMATURELY: ",
                TOTPToken,
                response.guard
              );
              window.location.href = "./src/errors/guard_check_failed.html";
            }
          });

          break;
        case 403:
          // perm ban
          window.location.href = "./src/errors/banned.html";
          break;
        case 503:
          // update ban
          window.location.href = "./src/errors/update_now.html";
          break;
        default:
          console.log("We'll just never know...!");
          break;
      }
    })
    .catch((error) => {
      window.location.href = "./src/errors/server_down.html";
    });
}


/*
module.exports = {
  __drivename,
  baseDir,
  helpersDir,
  backendDir,
  userAssetsDir,
  __lC,
};
*/

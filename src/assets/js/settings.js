// const os = require("os");
// const path = require("path");
// const fs = require("fs");
// let __drivename =
//   os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
// let launcherConfig;

// All the checkboxes in the settings window

const enableTracking = document.getElementById("enableTracking");
const darkTheme = document.getElementById("darkTheme");
const lightTheme = document.getElementById("lightTheme");
const backendOnline = document.getElementById("backendOnline");
const backendOffline = document.getElementById("backendOffline");

// Bypasses

const defaultBypass = document.getElementById("defaultBypass");
const platinumBypass = document.getElementById("platinumBypass");
const platinumv2Bypass = document.getElementById("platinumv2Bypass");
const riftBypass = document.getElementById("riftBypass");
const otherBypass = document.getElementById("otherBypass");
const otherBypass__text = document.getElementById("otherBypassText");

const backendDebug = document.getElementById("backendDebug");
const backendUpdates = document.getElementById("backendUpdates");
const splashDefault = document.getElementById("splashDefault");
const splashBlaze = document.getElementById("splashBlaze");
const errmsg = document.getElementById("errmsg");
// const sIP = document.getElementById("server-ip");

defaultBypass.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    platinumBypass.checked = false;
    platinumv2Bypass.checked = false;
    riftBypass.checked = false;
    otherBypass.checked = false;
  } else {
    // Checkbox is not checked..
    defaultBypass.checked = true;
  }
  saveSettings();
});

platinumBypass.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    defaultBypass.checked = false;
    platinumv2Bypass.checked = false;
    riftBypass.checked = false;
    otherBypass.checked = false;
  } else {
    // Checkbox is not checked..
    platinumBypass.checked = true;
  }
  saveSettings();
});

platinumv2Bypass.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    defaultBypass.checked = false;
    platinumBypass.checked = false;
    otherBypass.checked = false;
    riftBypass.checked = false;
  } else {
    // Checkbox is not checked..
    platinumv2Bypass.checked = true;
  }
  saveSettings();
});

riftBypass.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    defaultBypass.checked = false;
    platinumBypass.checked = false;
    platinumv2Bypass.checked = false;
    otherBypass.checked = false;
  } else {
    // Checkbox is not checked..
    riftBypass.checked = true;
  }
  saveSettings();
});

otherBypass.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    defaultBypass.checked = false;
    platinumv2Bypass.checked = false;
    platinumBypass.checked = false;
    riftBypass.checked = false;
    otherBypass__text.classList.remove("hidden");
  } else {
    // Checkbox is not checked..
    defaultBypass.checked = true;
    otherBypass__text.classList.add("hidden");
  }
  saveSettings();
});

/////////////////////////////////////////////////////////////////

lightTheme.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    darkTheme.checked = false;
  } else {
    // Checkbox is not checked..
    darkTheme.checked = true;
  }
  saveSettings();
  setTimeout(() => {
    window.location.reload();
  }, 950);
});

darkTheme.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    lightTheme.checked = false;
  } else {
    // Checkbox is not checked..
    lightTheme.checked = true;
  }
  saveSettings();
  setTimeout(() => {
    window.location.reload();
  }, 950);
});

backendOnline.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    backendOffline.checked = false;
  } else {
    // Checkbox is not checked..
    backendOffline.checked = true;
  }
  saveSettings();
});

backendOffline.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    backendOnline.checked = false;
  } else {
    // Checkbox is not checked..
    backendOnline.checked = true;
  }
  saveSettings();
});

/*
splashDefault.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    splashBlaze.checked = false;
  } else {
    // Checkbox is not checked..
    splashBlaze.checked = true;
  }
});

splashBlaze.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    splashDefault.checked = false;
  } else {
    // Checkbox is not checked..
    splashDefault.checked = true;
  }
});
*/
//TODO FSACCESS NAVJSON. IF NOT FOUND, CREATE FILE

(function createConfig() {
  fs.access(baseDir, function (error) {
    if (error) {
      fs.mkdirSync(baseDir);
      console.log("Created New Blaze Dir!");
      createRepoDir();
    }
    fs.access(configDir, function (error) {
      if (error) {
        fs.mkdirSync(configDir);
        console.log("Created New Blaze/Launcher Dir!");

        fetch(`${launcherConfig.shopEndpoint}/config/settings.json`)
          .then((response) => response.json())
          .then((data) => {
            launcherConfig = data;
            let navjson = JSON.stringify(launcherConfig, null, 2);
            fs.writeFileSync(
              path.join(configDir, "settings.json"),
              navjson,
              "utf-8"
            );
            createConfig();
          })
          .catch((err) => console.error(err));
      }
      if (fs.existsSync(path.join(configDir, "settings.json"))) {
        launcherConfig = require(path.join(configDir, "settings.json"));
        restoreSettings();
      }
      if (!fs.existsSync(path.join(configDir, "settings.json"))) {
        fetch(`${launcherConfig.shopEndpoint}/config/settings.json`)
          .then((response) => response.json())
          .then((data) => {
            launcherConfig = data;
            let navjson = JSON.stringify(launcherConfig, null, 2);
            fs.writeFileSync(
              path.join(configDir, "settings.json"),
              navjson,
              "utf-8"
            );
            launcherConfig = require(path.join(configDir, "settings.json"));
            restoreSettings();
          })
          .catch((err) => console.error(err));
      }
    });
  });
})();

function restoreSettings() {
  // Restore all of the settings in the window
  console.log(launcherConfig);
  document.getElementsByTagName("main")[0].classList.remove("pointer-events-none");

  if (launcherConfig.bypassMethod === "platinum") {
    platinumBypass.checked = true;
  } else if (launcherConfig.bypassMethod === "platinum2") {
    platinumv2Bypass.checked = true;
  } else if (launcherConfig.bypassMethod === "rift") {
    riftBypass.checked = true;
  } else {
    otherBypass.checked = true;
    otherBypass__text.classList.remove("hidden");
    otherBypass__text.value = launcherConfig.bypassMethod;
  }

  if (launcherConfig.tracking === true) {
    enableTracking.checked = true;
  } 

  if (launcherConfig.theme === "light") {
    lightTheme.checked = true;
  } else if (launcherConfig.theme === "dark") {
    darkTheme.checked = true;
  } else {
    errmsg.classList.remove("hidden");
  }

  if (launcherConfig.online === false) {
    backendOffline.checked = true;
  } else if (launcherConfig.online === true) {
    backendOnline.checked = true;
  } else {
    errmsg.classList.remove("hidden");
  }

  // sIP.value = launcherConfig.server_ip;

  if (launcherConfig.backend.debug === true) {
    backendDebug.checked = true;
  } else if (launcherConfig.backend.debug === false) {
    backendDebug.checked = false;
  } else {
    errmsg.classList.remove("hidden");
  }

  if (launcherConfig.backend.auto_update === true) {
    backendUpdates.checked = true;
  } else if (launcherConfig.backend.auto_update === false) {
    backendUpdates.checked = false;
  } else {
    errmsg.classList.remove("hidden");
  }
}

function saveSettings() {
  if (fs.existsSync(path.join(configDir, "settings.json"))) {
    // Could've used case statments for this but I totally forgot; if anyone would like to fix this I wouldn't mind a bit
    // Go right ahead! :)
    // baseDir, used in some scripts - since it's getting ridiculous now to include the above
    // imports in **EVERY SINGLE ONE** OF THEM now...
    launcherConfig.base = configDir;
    // platinum

    if (defaultBypass.checked) {
      launcherConfig.bypassMethod = "fortniteproject";
    }

    if (platinumBypass.checked) {
      launcherConfig.bypassMethod = "platinum";
    }

    // platinumv2

    if (platinumv2Bypass.checked) {
      launcherConfig.bypassMethod = "platinum2";
    }

    // Rift

    if (riftBypass.checked) {
      launcherConfig.bypassMethod = "rift";
    }

    // Other bypass

    if (otherBypass.checked) {
      launcherConfig.bypassMethod = otherBypass__text.value;
    }

    if (enableTracking.checked === true) {
      launcherConfig.tracking = true;
    } else {
      launcherConfig.tracking = false;
    } 

    if (lightTheme.checked === false) {
      launcherConfig.theme = "dark";
    }
    if (lightTheme.checked) {
      launcherConfig.theme = "light";
    }

    if (backendUpdates.checked) {
      launcherConfig.backend.auto_update = true;
    } else {
      launcherConfig.backend.auto_update = false;
    }

    if (backendDebug.checked) {
      launcherConfig.backend.debug = true;
    } else {
      launcherConfig.backend.debug = false;
    }

    if (backendOnline.checked) {
      launcherConfig.online = true;
    } else {
      launcherConfig.online = false;
    }

   //  launcherConfig.server_ip = sIP.value;

    let navjson = JSON.stringify(launcherConfig, null, 2);
    fs.writeFileSync(path.join(configDir, "settings.json"), navjson, "utf-8");
  }
}

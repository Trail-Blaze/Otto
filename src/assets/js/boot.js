const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let helpersDir = path.join(blazeDir, "/helpers/");
let backendDir = path.join(blazeDir, "/backend/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
const launcherConfig = require(path.join(blazeDir, "settings.json")); // Opening settings file for readOnly
let installLength;
let installList;
let counter = 0;

const exec_options = {
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: "SIGTERM",
  cwd: helpersDir,
  env: null,
};

const exec_options2 = {
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: "SIGTERM",
  cwd: backendDir,
  env: null,
};

setTimeout(function () {
  if (fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
    installList = require(path.join(userAssetsDir, "\\InstallList.json"));
    installLength = Object.keys(installList.InstallList).length - 1; // Set an offset otherwise it will cause some weird errors to appear
    setContent();
  }
}, 2000); //wait 2 seconds

function setContent() {
  populateCatalog(
    installLength,
    entryListAll,
    ["flex", "pr-5", "w-full"],
    "entryTemplate",
    0
  );
}

/*
 *
 * USAGE [ populateCatalog(listlength, entry, classListArray, entryTemplate, uniqueID, counterTemplateExists)]
 *
 * listlength = How long does the package list have to be?
 * entry = EntryPoint. Where does the list have to be placed
 * classListArray = What classes has to be applied to the entries?
 * uniqueId = Only use this only if you have more than one list on the page (OPTIONAL)
 * counterTemplateExists = Use this if you want to have a counter on the page
 *
 *
 */

function populateCatalog(
  listlength,
  entry,
  classListArray,
  entryTemplate,
  uniqueID,
  counterTemplateExists
) {
  /*
  if (!listlength) {
    console.error("ListLength must not be empty!");
    return;
  }*/ // TURN OFF WARNING

  if (listlength > installLength) {
    console.error(
      "ListLength must not be more than the *ACTUAL* repository list length!"
    );
    return;
  }

  // Clear DIV before adding anything
  entry.innerHTML = "";

  while (counter <= listlength) {
    // console.log(counter);

    // Create Entry
    let pakEntry = document.createElement("div");
    const entryList = entry;
    pakEntry.setAttribute("id", `package__${counter}__${uniqueID}`);
    entryList.appendChild(pakEntry);

    // Access Newly Created Entry and Edit it To Our Needs
    const newEntry = document.getElementById(
      `package__${counter}__${uniqueID}`
    );
    const classList = classListArray;
    newEntry.classList.add(...classList);
    newEntry.innerHTML = document.getElementById(entryTemplate).innerHTML;

    if (counterTemplateExists) {
      counterTemplate = document.getElementById("counterTemplate");
      counterTemplate.innerText = counter;
      counterTemplate.id = "";
      // console.log(counter);
    }

    // Set Package Icon
    changeID("templateIcon", `package__${counter}_icon__${uniqueID}`);
    pakIcon = document.getElementById(`package__${counter}_icon__${uniqueID}`);

    if (installList.InstallList[`${counter}`].icon)
      pakIcon.src = installList.InstallList[`${counter}`].icon;

    // Set Package Title
    changeID("templateTitle", `package__${counter}_title__${uniqueID}`);
    pakTitle = document.getElementById(
      `package__${counter}_title__${uniqueID}`
    );
    pakTitle.innerText = installList.InstallList[`${counter}`].name;

    // Set Package Entry #
    changeID("entry", `package__${counter}_entry__${uniqueID}`);
    pakEntry = document.getElementById(
      `package__${counter}_entry__${uniqueID}`
    );
    pakEntry.innerText = `Entry #${counter}`;

    // Set Package Short Description
    changeID("templateDesc", `package__${counter}_description__${uniqueID}`);
    pakDesc = document.getElementById(
      `package__${counter}_description__${uniqueID}`
    );
    pakDesc.innerText = installList.InstallList[`${counter}`].logonAs;

    // Set "GET" Button ID
    document.getElementById("TEMPLATE_GETID").id = `${counter}`;

    // Move up to the Next Package in the List
    counter++;
  }
}
function changeID(oldid, newID) {
  e = document.getElementById(oldid.toString());
  e.id = newID;
}

function removeID(oldid) {
  e = document.getElementById(oldid.toString());
  e.id = "";
}

function sendID(clicked_id) {
  console.log(clicked_id);
  let thisID = clicked_id;
  let thisElement = document.getElementById(thisID);
  thisElement.classList.remove("bg-red-300");
  thisElement.classList.remove("color-white");
  thisElement.classList.add("bg-yellow-300");
  thisElement.classList.add("color-black");
  thisElement.innerText = "Loading...";

  // Remove old script if any

  exec(
    "del runner.bat",
    exec_options,

    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

  // Create new script

  exec(
    `echo kickstart "${installList.InstallList[thisID].location}" eac 87a0c99d9aa3ab5bb6a36C25 ${launcherConfig.bypassMethod} ${installList.InstallList[thisID].logonAs}> runner.bat`,
    exec_options,

    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        thisElement.innerText = "Failed. 😢";
        thisElement.classList.remove("bg-yellow-300");
        thisElement.classList.remove("color-black");
        thisElement.classList.add("bg-red-300");
        thisElement.classList.add("color-white");
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        thisElement.innerText = "Failed. 😢";
        thisElement.classList.remove("bg-yellow-300");
        thisElement.classList.remove("color-black");
        thisElement.classList.add("bg-red-300");
        thisElement.classList.add("color-white");
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

  // Start the backend...

  exec(
    `StartMainServiceModule.lnk`,
    exec_options2,

    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        thisElement.innerText = "Backend Failed. 😱";
        thisElement.classList.remove("bg-yellow-300");
        thisElement.classList.remove("color-black");
        thisElement.classList.add("bg-red-300");
        thisElement.classList.add("color-white");
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        thisElement.innerText = "Backend Failed. 😱";
        thisElement.classList.remove("bg-yellow-300");
        thisElement.classList.remove("color-black");
        thisElement.classList.add("bg-red-300");
        thisElement.classList.add("color-white");
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

  // Run the thang...

  exec("legacyBoot.lnk", exec_options, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      thisElement.innerText = "Failed. 😢";
      thisElement.classList.remove("bg-yellow-300");
      thisElement.classList.remove("color-black");
      thisElement.classList.add("bg-red-300");
      thisElement.classList.add("color-white");
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      thisElement.innerText = "Failed. 😢";
      thisElement.classList.remove("bg-yellow-300");
      thisElement.classList.remove("color-black");
      thisElement.classList.add("bg-red-300");
      thisElement.classList.add("color-white");
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  thisElement.innerText = "Running...";
  // ipc.send("sendState", clicked_id);
}
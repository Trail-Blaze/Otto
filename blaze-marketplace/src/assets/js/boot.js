const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let helpersDir = path.join(blazeDir, "/helpers/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
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

if (fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  installList = require(path.join(userAssetsDir, "\\InstallList.json"));
  installLength = Object.keys(installList.InstallList).length - 1; // Set an offset otherwise it will cause some weird errors to appear
  setContent();
}

function setContent() {
  populateCatalog(
    installLength,
    entryListAll,
    ["flex", "pr-5", "justify-between"],
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
  thisElement.innerText = "Loading...";

  exec(
    `kickstart "${installList.InstallList[thisID].location}" -nobe -fromfl=eac -fltoken=87a0c99d9aa3ab5bb6a36C25`, exec_options,
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
  thisElement.innerText = "Running...";
  // ipc.send("sendState", clicked_id);
}

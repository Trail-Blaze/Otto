const { exec } = require("child_process");
let installLength;
let installList;
let counter = 0;
let script;

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

// Resize Main
setTimeout(() => {
  main.style.height = "150vh";
}, 500);

setTimeout(function () {
  if (fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
    installList = require(path.join(userAssetsDir, "\\InstallList.json"));
    installLength = Object.keys(installList).length - 1; // Set an offset otherwise it will cause some weird errors to appear
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
    pakEntry.setAttribute("id", `install__${counter}`);
    entryList.appendChild(pakEntry);

    // Access Newly Created Entry and Edit it To Our Needs
    const newEntry = ref(`install__${counter}`);
    const classList = classListArray;
    newEntry.classList.add(...classList);
    newEntry.innerHTML = ref(entryTemplate).innerHTML;

    if (counterTemplateExists) {
      counterTemplate = ref("counterTemplate");
      counterTemplate.innerText = counter;
      counterTemplate.id = "";
      // console.log(counter);
    }

    // Set Package Icon
    changeID("templateIcon", `install__${counter}_icon`);
    pakIcon = ref(`install__${counter}_icon`);

    if (installList[`${counter}`].icon)
      pakIcon.src = installList[`${counter}`].icon;

    // Set Package Title
    changeID("templateTitle", `install__${counter}_title`);
    pakTitle = ref(`install__${counter}_title`);
    pakTitle.innerText = installList[`${counter}`].name;
    pakTitle.classList.remove("skeleton");

    // Set Package Entry #
    changeID("entry", `install__${counter}_entry`);
    pakEntry = ref(`install__${counter}_entry`);
    pakEntry.innerText = `Entry #${counter}`;

    // Set Package Short Description
    changeID("templateDesc", `install__${counter}_description`);
    pakDesc = ref(`install__${counter}_description`);
    pakDesc.innerText = installList[`${counter}`].logonAs;

    changeID("templateD_container", `tDC_${counter}`);
    ref(`tDC_${counter}`).classList.remove("skeleton");

    // Set "GET" Button ID
    ref("TEMPLATE_GETID").id = `${counter}`;

    // Set Edit button ID
    changeID("edit", `edit_${counter}`);

    // Set Remove button ID
    changeID("remove", `${counter}`);

    // Set Dropdown ID
    changeID("dropdown", `dropdown_${counter}`);

    // Set Dropdown Container ID
    changeID("dropdown_cont", `dcont_${counter}`);

    // Move up to the Next Package in the List
    counter++;
  }
}
function changeID(oldid, newID) {
  e = ref(oldid.toString());
  e.id = newID;
}

function removeID(oldid) {
  e = ref(oldid.toString());
  e.id = "";
}

function sendID(clicked_id) {
  console.log(clicked_id);
  let thisID = clicked_id;
  let thisElement = ref(thisID);
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
  // For backwards compatibility 
  // Try catch for kickstart, if no kickstart do rocket

  if (fs.existsSync(path.join(helpersDir, "/kickstart.bat"))) {
    script = "kickstart";
  } else {
    script = "rocket";
  }

  exec(
    `echo ${script} "${
      installList[thisID].location
    }" eac 87a0c99d9aa3ab5bb6a36C25 ${"DLL\\" + launcherConfig.bypassMethod} ${
      installList[thisID].logonAs || "BlazeUser"
    } 54 > runner.bat`, // Timeout based upon the average time Fortnite takes to launch
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

ranAlready = false;
function changeBanner() {
  getHTML(
    "https://raw.githubusercontent.com/Trail-Blaze/marketplace/main/featuredContent/announcements/partials/letsgo.html",
    "announcementBanner"
  );

  if (!ranAlready) {
    setTimeout(() => {
      getHTML(
        "https://raw.githubusercontent.com/Trail-Blaze/marketplace/main/featuredContent/announcements/partials/announcement.html",
        "announcementBanner"
      );
    }, 60000);
  } else {
    ranAlready = true;
  }
}

setInterval(() => {
  if (entryListAll.innerHTML == "") {
    entryListAll.innerHTML =
      "<div>There are no installs to show. Start by <a class='text-blue-400' href='firststartup.html'>creating one</a>.</div>";
  }
}, 3000);

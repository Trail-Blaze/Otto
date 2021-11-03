const { app, remote, electron, ipcRenderer } = require("electron");
const ipc = ipcRenderer;
let repo;
let counter = 1;

fetch("https://trail-blaze.github.io/scoop/scoop_repo.json")
  .then((response) => response.json())
  .then((data) => {
    repo = data;
    setContent();
  })
  .catch((err) => console.error(err));

function setContent() {
  populateCatalog(
    repo.repoProps.total_packages,
    entryListAll,
    ["w-1/2", "flex", "pr-6"],
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
  if (!listlength) {
    console.error("ListLength must not be empty!");
    return;
  }
  if (listlength > repo.repoProps.total_packages) {
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
    pakIcon.src = repo.PackageList[`package__${counter}`].icon;

    // Set Package Title
    changeID("templateTitle", `package__${counter}_title__${uniqueID}`);
    pakTitle = document.getElementById(
      `package__${counter}_title__${uniqueID}`
    );
    pakTitle.innerText = repo.PackageList[`package__${counter}`].name;

    // Set Package Short Description
    changeID("templateDesc", `package__${counter}_description__${uniqueID}`);
    pakDesc = document.getElementById(
      `package__${counter}_description__${uniqueID}`
    );
    pakDesc.innerText = repo.PackageList[`package__${counter}`].desc_shrt;

    // Set "GET" Button ID
    document.getElementById("TEMPLATE_GETID").id = `package__${counter}`;

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
  ipc.send("sendState", clicked_id);
  ipc.send("reqPageSwitch", "package_viewer.html");
}

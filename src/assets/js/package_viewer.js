const { app, remote, electron, ipcRenderer } = require("electron");
const ipc = ipcRenderer;
const icon = document.getElementById("icon");
const pakname = document.getElementById("name");
const desc_shrt = document.getElementById("desc_shrt");
const desc_long = document.getElementById("desc_long");
const publisher = document.getElementById("pub");
const download__update = document.getElementById("download_rel");
const currentVersion = document.getElementById("cV");
const cloudLatestVersion = document.getElementById("LVc");
const category = document.getElementById("cat");
const slideOne = document.getElementById("1");
const slideTwo = document.getElementById("2");
const slideThree = document.getElementById("3");
let repo;
let state;

// Fetch repository data

fetch("https://trail-blaze.github.io/scoop/scoop_repo.json")
  .then((response) => response.json())
  .then((data) => {
    repo = data;
    setupState();
  })
  .catch((err) => console.error(err));

function setupState() {
  ipc.send("reqState");
  ipc.on("sendState", (event, data) => {
    state = data.toString();
    console.log(state);
    setContent();
  });
}

function setContent() {
  let package = repo.PackageList[state];
  icon.src = package.icon;
  pakname.innerText = package.name;
  desc_shrt.innerText = package.desc_shrt;
  desc_long.innerText = package.desc_long;
  publisher.innerText = `Pub: ${package.pub}`;
  cloudLatestVersion.innerText = `LATEST_VERSION [CLOUD] = ${package.version}`;
  if (package.cat != undefined) {
    cat.innerText = `Category = ${package.cat}`;
  } else {
    cat.innerText = "Category = Uncategorized";
  }
}

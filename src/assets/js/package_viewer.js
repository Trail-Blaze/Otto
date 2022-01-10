const { app, remote, electron, ipcRenderer } = require("electron");
const ipc = ipcRenderer;
const YAML = require("yaml");
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
let setup;
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

  fetch(package.dl_setupLoc)
  .then((response) => response.json())
  .then((data) => {
    setup = YAML.parse(data);
    console.log(setup);
  })
  .catch((err) => console.error(err));


  console.log(setup);
  icon.src = package.icon;
  pakname.innerText = package.name;
  desc_shrt.innerText = package.desc_shrt;
  desc_long.innerText = package.desc_long;
  publisher.innerText = `Pub: ${package.pub}`;
  cloudLatestVersion.innerText = `Latest Version [Cloud] = ${package.version}`;
  if (package.cat != undefined) {
    cat.innerText = `Category = ${package.cat}`;
  } else {
    cat.innerText = "Category = Uncategorized";
  }

  // Slide One

  slideOne.style.background = `url("${package.mediaOne}") no-repeat center`;
  slideOne.style.backgroundSize = "contain";

  // Slide Two

  slideTwo.style.background = `url("${package.mediaTwo}") no-repeat center`;
  slideTwo.style.backgroundSize = "contain";

  // Slide Three

  slideThree.style.background = `url("${package.mediaThree}") no-repeat center`;
  slideThree.style.backgroundSize = "contain";
}

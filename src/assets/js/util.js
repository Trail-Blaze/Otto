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
ref = (id) => document.getElementById(id);

function sleep(ms = parseInt(ms)) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function unTruncate(id) {
  id = ref(id);
  if (id.classList.contains("truncate")) {
    id.classList.remove("truncate");
  } else {
    id.classList.add("truncate");
  }
}

function openILL() {
  const { shell } = require("electron"); // deconstructing assignment
  shell.openPath(path.join(userAssetsDir, "\\InstallList.json")); // Show the given file in a file manager. If possible, select the file.
}

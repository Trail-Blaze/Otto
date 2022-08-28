const { ipcRenderer } = require("electron");
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
const { downloadButton } = require("./src/assets/js/lib/extensionHandler");
let setup;
let repo;
let state;
let package;

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
  package = repo.PackageList[state];

  fetch(package.dl_setupLoc)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then((data) => {
      setup = YAML.parse(data);
      console.log(setup);
      setDownload();
    })
    .catch((err) => console.log("YAML PARSE ERR! --> ", err));

  console.log(setup);
  icon.src = package.icon;
  pakname.innerText = package.name;
  desc_shrt.innerText = package.desc_shrt;
  desc_long.innerHTML = parseMD(package.desc_long);
  publisher.innerText = `Pub: ${package.pub}`;
  cloudLatestVersion.innerText = package.version;
  if (package.cat != undefined) {
    cat.innerText = package.cat;
  } else {
    cat.innerText = "Uncategorized";
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

function setDownload() {
  switch (setup.type) {
    case "backend/binary":
      console.log("BINARY FILE");
      category.innerHTML = "Backend";
      break;
    case "backend/bundle":
      console.log("BUNDLE FILE");
      category.innerHTML = "Backend";
      break;
    case "PAKCHUNK":
      console.log("PAKCHUNK FILE");
      category.innerHTML = "RiftMods (Pakfile)";

      break;
    case "DLL":
      console.log("DLL FILE");
      category.innerHTML = "Server Bypass Mechanism (DLL)";
      break;
    default:
      console.error("UNKNOWN TYPE!");
  }
}

function parseMD(md) {
  //ul
  md = md.replace(/^\s*\n\*/gm, "<ul>\n*");
  md = md.replace(/^(\*.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
  md = md.replace(/^\*(.+)/gm, "<li>$1</li>");

  //ol
  md = md.replace(/^\s*\n\d\./gm, "<ol>\n1.");
  md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
  md = md.replace(/^\d\.(.+)/gm, "<li>$1</li>");

  //blockquote
  md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

  //h
  md = md.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
  md = md.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
  md = md.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
  md = md.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");

  // Custom H2

  md = md.replace(
    /[\#]{2}(.+)/g,
    '<div class="desc_header text-gray-900 font-bold text-2xl pb-5">$1</div>'
  );

  //  md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
  //  md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

  // Custom H1
  md = md.replace(
    /[\#]{1}(.+)/g,
    '<div class="desc_header text-gray-900 font-bold text-3xl pb-5">$1</div>'
  );

  //alt h
  md = md.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
  md = md.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

  //images
  md = md.replace(
    /\!\[([^\]]+)\]\(([^\)]+)\)/g,
    '<img class="pb-3" src="$2" alt="$1" />'
  );

  //links
  md = md.replace(
    /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
    '<a href="$2" target="__blank" title="$4" style="color: blue">$1</a>'
  );

  //blockquote
  md = md.replace(
    /^\>(.+)/gm,
    '<div class="blockquote-wrap"><div class="blockquote-sep">&nbsp;</div><blockquote><p>$1</p></blockquote></div>'
  );

  //font styles
  md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");
  md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>");
  md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>");

  //pre
  md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
  md = md.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

  //code
  md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

  //p
  md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
      ? m
      : '<p class="pb-10">' + m + "</p>";
  });

  //strip p from pre
  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

  return md;
}

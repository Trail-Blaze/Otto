let icon;
let ip;
let title;
let description;
let CID;
let _index;
setTimeout(() => {
  configure();
}, 2000);
function configure() {
  ref("entryListAll").innerHTML = "";
  // templateIcon, ip, templateTitle, templateDescription, connectionID
  Object.keys(_data).forEach(async (value, index = index - 1) => {
    let x = document.createElement("div");
    x.innerHTML = ref("entryTemplate").innerHTML;
    ref("entryListAll").append(x);
    // Wait for write to finish
    await sleep(500);
    changeID("templateTitle", `serverT_${index}`);
    title = ref(`serverT_${index}`);
    changeID("templateIcon", `serverI_${index}`);
    icon = ref(`serverI_${index}`);
    changeID("ip", `serverip_${index}`);
    ip = ref(`serverip_${index}`);
    changeID("templateDescription", `serverD_${index}`);
    description = ref(`serverD_${index}`);
    changeID("connectionID", `${index}`);
    CID = ref(index);
    _index = index;
    tryAgain(_index, description);
  });
}
function tryAgain(index, desc) {
  try {
    title.innerHTML = _data[index].name;
    title.classList.value =
      "text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate";
    icon.src = _data[index].icon;
    ip.innerHTML = _data[index].host;
    ip.classList.remove("skeleton");
    setInterval(() => {
      desc.classList.remove("skeleton");
      switch (desc.innerHTML) {
        case _data[index].motd1:
          desc.innerHTML = _data[index].motd2;
          break;
        default:
          desc.innerHTML = _data[index].motd1;
          break;
      }
    }, parseInt(getRandomInt(3, 5).toString() + "000"));
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      configure();
    }, 2000);
  }
}

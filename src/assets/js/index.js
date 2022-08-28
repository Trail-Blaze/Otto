const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

let repo;
let catalog;
let counter = 1;
// Slide One
const title1 = document.getElementById("t1");
const caption1 = document.getElementById("c1");
const caption1__2 = document.getElementById("c1-2");
// Slide Two
const title2 = document.getElementById("t2");
const caption2 = document.getElementById("c2");
const caption2__2 = document.getElementById("c2-2");
//Slide Three
const title3 = document.getElementById("t3");
const caption3 = document.getElementById("c3");
const caption3__2 = document.getElementById("c3-2");
// Slide Four
const title4 = document.getElementById("t4");
const caption4 = document.getElementById("c4");
const caption4__2 = document.getElementById("c4-2");
// Banner Constants
const banner1 = document.getElementById("1");
const banner2 = document.getElementById("2");
const banner3 = document.getElementById("3");
const banner4 = document.getElementById("4");
// Featured App
const featuredApp__title1 = document.getElementById("featured-app");
const featuredApp__title = document.getElementById("featured-app__title");
const featuredApp__desc = document.getElementById("featured-app__desc");
const featuredApp__icon = document.getElementById("featured-app__icon");
// Collection
const collection = document.getElementById("collection");
const collectionSubtitle = document.getElementById("collection__subtitle");
const collectionSubtitle2 = document.getElementById("collection__subtitle2");
const collectionSubtitleIcon = document.getElementById(
  "collection__subtitle__icon"
);
// Section One
const sectionOneTitle = document.getElementById("sectionOneTitle");
const sectionOne = document.getElementById("sectionOne");
// Section Two
const sectionTwoTitle = document.getElementById("sectionTwoTitle");
const sectionTwo = document.getElementById("sectionTwo");
const viewAll = document.getElementById("viewAll");
const viewAll2 = document.getElementById("viewAll2");

viewAll.addEventListener("click", () => {
  ipc.send("reqPageSwitch", "view_all.html");
});
viewAll2.addEventListener("click", () => {
  ipc.send("reqPageSwitch", "view_all.html");
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
fetch("https://trail-blaze.github.io/scoop/scoop_repo.json")
  .then((response) => response.json())
  .then(async (data) => {
    repo = data;
    await sleep(50); // Prevents race conditions
    setContent();
  })
  .catch((err) => console.error(err));
fetch(`${launcherConfig.shopEndpoint}/catalog.json`)
  .then((response) => response.json())
  .then(async (data) => {
    catalog = data;
    await sleep(50); // Prevents event nastier race conditions
    setCatalog();
  })
  .catch((err) => console.error(err));

function setContent() {
  // Constants

  const r1 = rand(0, 10);
  const r2 = rand(0, 10);
  const r3 = rand(0, 10);
  const r4 = rand(0, 10);

  // Slide One

  title1.innerText = repo.FeaturedContent[r1].top;
  caption1.innerText = repo.FeaturedContent[r1].bottom;
  caption1__2.innerText = repo.FeaturedContent[r1].bottom2;
  banner1.style.background = `url("${repo.FeaturedContent[r1].img}") no-repeat`;
  banner1.style.backgroundSize = "cover";
  //END
  // Slide Two
  title2.innerText = repo.FeaturedContent[r2].top;
  caption2.innerText = repo.FeaturedContent[r2].bottom;
  caption2__2.innerText = repo.FeaturedContent[r2].bottom2;
  banner2.style.background = `url("${repo.FeaturedContent[r2].img}") no-repeat`;
  banner2.style.backgroundSize = "cover";
  //END
  // Slide 3
  title3.innerText = repo.FeaturedContent[r3].top;
  caption3.innerText = repo.FeaturedContent[r3].bottom;
  caption3__2.innerText = repo.FeaturedContent[r3].bottom2;
  banner3.style.background = `url("${repo.FeaturedContent[r3].img}") no-repeat`;
  banner3.style.backgroundSize = "cover";
  //END
  // Slide 4
  title4.innerText = repo.FeaturedContent[r4].top;
  caption4.innerText = repo.FeaturedContent[r4].bottom;
  caption4__2.innerText = repo.FeaturedContent[r4].bottom2;
  banner4.style.background = `url("${repo.FeaturedContent[r4].img}") no-repeat`;
  banner4.style.backgroundSize = "cover";
}

function setCatalog() {
  // Featured App Content

  featuredApp__title1.innerText = catalog.CatalogConstants.featuredAppTitle;
  featuredApp__title.innerText = repo.FeaturedContent.app.title;
  featuredApp__desc.innerText = repo.FeaturedContent.app.desc;
  featuredApp__icon.src = repo.FeaturedContent.app.icon;

  // Collection Content
  // Collection
  collection.innerText = catalog.CatalogConstants.collectionTitle;
  collectionSubtitle.innerText = catalog.CatalogConstants.collectionSubtitle;
  collectionSubtitle2.innerText = catalog.CatalogConstants.collectionSubtitle2;
  collectionSubtitleIcon.src = catalog.CatalogConstants.collectionSubtitleIcon;
  // Section One Content
  sectionOneTitle.innerText = catalog.CatalogConstants.sectionOneTitle;
  // Section Two Content
  sectionTwoTitle.innerText = catalog.CatalogConstants.sectionTwoTitle;

  populateCatalog(6, sectionOne, ["w-1/2", "flex", "pr-6"], "entryTemplate", 0);


  counter = 1;

  populateCatalog(
    6,
    sectionTwo,
    ["w-1/2", "pr-12"],
    "entryTemplateS2",
    1,
    true
  );

}
// w-1/2 pr-12

/*
 *
 * USAGE [ populateCatalog(listlength, entry, classListArray, entryTemplate, uniqueID, counterTemplateExists)]
 *
 * listlength = How long does the package list have to be?
 * entry = EntryPoint. Where does the list have to be placed
 * classListArray = What classes has to be applied to the entries?
 * entryTemplate = What compatible template must be added to the entry elements?
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
      "ListLength must not be more than the *ACTUAL* repository list length! Continuing anyway and assuming that programmer wants to max out the list."
    );
    listlength = repo.repoProps.total_packages;
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
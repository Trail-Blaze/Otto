let status_ = document.getElementById("reviewStatus");

// amIbanned();

if (!fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  status_.innerHTML = "WELCOME TO VOLTAIC! HAVE FUN!<br/><p>DEV-BUILD_51<br/><code>[2022-08-04T22:47:01.762Z]</code></p>";
  setTimeout(()=>{window.location.replace("firststartup.html")}, 4500);
} else {
  status_.innerText = "ROUTING..."
  setTimeout(()=>{window.location.replace("index.html")}, 4500);
}

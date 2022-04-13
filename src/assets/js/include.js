function Include() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("includefile");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = `<div style="width: 100%; height: 250px; background: #000000ab; margin-bottom: 4vh;"><h1 style="position: relative; top: 35%; left: 8%; font-size: 20pt; color: white">Whoops! Something snapped while loading an asset.</h1></div>`;
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("includefile");
          Include();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function getHTML(file, id) {
  

  /* Make an HTTP request using the attribute value as the file name: */
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.getElementById(id).innerHTML = this.responseText;
      }
      if (this.status == 404) {
        document.getElementById(id).innerHTML = `<div style="width: 100%; height: 250px; background: #000000ab; margin-bottom: 4vh;"><h1 style="position: relative; top: 35%; left: 8%; font-size: 20pt; color: white">Whoops! Something snapped while loading an asset.</h1></div>`;
      }
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}

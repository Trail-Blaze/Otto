let p = document.querySelector("#drag0");
p.addEventListener(
    "click",
    function init() {
      p.removeEventListener("click", init, false);
      p.className = p.className + " resizable";
      var resizer = document.createElement("div");
      resizer.className = "resizer";
      p.appendChild(resizer);
      resizer.addEventListener("mousedown", initDrag, false);
    },
    false
  );

// Sidebar Resize

function initDrag(e) {
  startX = e.clientX;
  //   startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10); // Disable resize Y
  //  startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
  document.documentElement.addEventListener("mousemove", doDrag, false);
  document.documentElement.addEventListener("mouseup", stopDrag, false);
}

function doDrag(e) {
  p.style.width = startWidth + e.clientX - startX + "px";
  //   p.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
  document.documentElement.removeEventListener("mousemove", doDrag, false);
  document.documentElement.removeEventListener("mouseup", stopDrag, false);
}

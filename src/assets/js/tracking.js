startTracking();
function startTracking() {
  try {
    if (launcherConfig.tracking) {
      console.log("[TRACKING] Google Analytics Tracking Started.");
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-HGW0P5HTEX");
    }
  } catch (error) {
    setTimeout(() => {
      startTracking();
    }, 100);
  }
}

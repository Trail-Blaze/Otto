const os_util = require("os-utils");
require("v8-compile-cache");

// For Resource Manager Tab in Launcher

// Utilization for each resource is printed in renderer-process browser console

// CPU Utilization

// Code for Resource Manager
setInterval(() => {
  os_util.cpuUsage(async function (v) {
    const cpu_usage = v * 100;
    const mem_usage = os_util.freememPercentage() * 100;
    const tot_mem = os_util.totalmem() / 1024;

    //  console.log("CPU Usage (%): " + cpu_usage);
    document.getElementById("cpu").innerHTML = `${cpu_usage.toFixed(2)}%`;

    //   console.log("Mem Usage (%): " + mem_usage);
    document.getElementById("mem").innerHTML = `${mem_usage.toFixed(2)}%`;

    //   console.log("Total Mem (GB): " + tot_mem);
    document.getElementById("total_mem").innerHTML = `${tot_mem.toFixed(2)}GB`;
  });
}, 950);

console.log("[script.js]:: Attached and working properly!");

document.getElementById("generateButton").onclick = function() {

  let lines = document.getElementById("mapInput").value.split('\n');

  console.log("lines: ", lines);
}
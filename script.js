console.log("[script.js]:: Attached and working properly!");

document.getElementById("createInputButton").onclick = function() {
  let mapHeight = document.getElementById("mapHeight").value;
  let mapWidth = document.getElementById("mapWidth").value;
  console.log("[Map Dimensions (H x W)]:: ", mapHeight, " x ", mapWidth);

  //update the textarea size for easier input.
  document.getElementById("mapInput").setAttribute("class", "show");
}




//This reads the stuff in the input area, but cannot differentiate between lines...
document.getElementById("generateButton").onclick = function() {

  let lines = document.getElementById("mapInput").value.split('\n');

  console.log("lines: ", lines);
}
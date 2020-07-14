console.log("[script.js]:: Attached and working properly!");

//Test string:: ####################$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkllllllllllllllllllllmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnnnooooooooooooooooooooppppppppppppppppppppqqqqqqqqqqqqqqqqqqqq

//global scope so they can be referenced in later logic and update from anywhere.
let mapHeight = 19;
let mapWidth = 19;

//an array to hold the chars of textarea to increment through later.
let textAreaContent = [];

let column = [];

//global map container
let mapArray = [];

document.getElementById("createInputButton").onclick = function() {
  mapHeight = document.getElementById("mapHeight").value;
  mapWidth = document.getElementById("mapWidth").value;
  console.log("[Map Dimensions (H x W)]:: ", mapHeight, " x ", mapWidth);

  //update the textarea size for easier input.
  //WIDTH OF TEXTAREA IS 0-BASED, HEIGHT IS NOT!!!
  document.getElementById("mapInput").setAttribute("row", mapHeight);
  document.getElementById("mapInput").setAttribute("cols", mapWidth - 1);
  document.getElementById("mapInput").setAttribute("class", "show");
}

//This reads the stuff in the input area, but cannot differentiate between lines...
document.getElementById("generateButton").onclick = function() {

  textareaContent = document.getElementById("mapInput").value.split("");
  console.log("textareaContent: ", textareaContent);

  createMapData();
}

createMapData = () => {
  numberOfColumns = mapWidth;

  for(i = 0; i <= (numberOfColumns - 1); i++){
    //empty the column
    column = [];

    for(rowControl = 0; rowControl <= (mapHeight - 1); rowControl++){
      column.push(textAreaContent[rowControl]);
    }

    mapArray.push(column);
  }

  console.log("[mapArray]:: ", mapArray);
}
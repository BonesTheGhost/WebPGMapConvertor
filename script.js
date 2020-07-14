console.log("[script.js]:: Attached and working properly!");

//Test string:: ####################$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkllllllllllllllllllllmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnnnooooooooooooooooooooppppppppppppppppppppqqqqqqqqqqqqqqqqqqqq

//global scope so they can be referenced in later logic and update from anywhere.
let mapHeight = 20;
let mapWidth = 20;

let totalChars = mapHeight * mapWidth;
let charCursor = 0;

//an array to hold the chars of textarea to increment through later.
let textAreaContent = [];

let column = [];

//global map container
let mapArray = [];

document.getElementById("createInputButton").onclick = function() {
  mapHeight = document.getElementById("mapHeight").value;
  mapWidth = document.getElementById("mapWidth").value;

  totalChars = mapHeight * mapWidth;
  console.log("[Map Dimensions (H x W) : total chars]:: ", mapHeight, " x ", mapWidth, " : ", totalChars);

  //update the textarea size for easier input.
  //WIDTH OF TEXTAREA IS 0-BASED, HEIGHT IS NOT!!!
  document.getElementById("mapInput").setAttribute("row", mapHeight);
  document.getElementById("mapInput").setAttribute("cols", mapWidth - 1);
  document.getElementById("mapInput").setAttribute("class", "show");
}

//This reads the stuff in the input area, but cannot differentiate between lines...
document.getElementById("generateButton").onclick = function() {

  //grab the entire string with no \n or spaces
  contentString = document.getElementById("mapInput").value.split("");
  //spread it into textAreaContent (split may be redundant).
  textAreaContent = [...contentString];
  console.log(textAreaContent);
  
  createMapData();
}

sortColumns = () => {
  for(i=0; i<mapWidth; i++){
    //reset the column container
    column=[];

    for(a=i; a<totalChars; a+=mapHeight){
      let char = textAreaContent[a];
      column.push(char);
    }
    mapArray.push(column);
  }
}

createMapData = () => {

  sortColumns();

  console.log("[mapArray]:: ", mapArray);
}
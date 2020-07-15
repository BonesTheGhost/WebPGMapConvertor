console.log("[script.js]:: Attached and working properly!");

//Test string:: ####################$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkllllllllllllllllllllmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnnnooooooooooooooooooooppppppppppppppppppppqqqqqqqqqqqqqqqqqqqq

//global scope so they can be referenced in later logic and update from anywhere.
let mapHeight = 0;
let mapWidth = 0;

//controlled for tooMany or tooLittle characters input into map space.
let notExactCharacters = false;
let notEmpty = false;

//to control for not entering map height or width.
let didInputParameters = false;

let totalChars = mapHeight * mapWidth;
let charCursor = 0;

//an array to hold the chars of textarea to increment through later.
let textAreaContent = [];

let column = [];

//global map container
let mapArray = [];

let numberOfColumns = 0;
let outputController = 0;
let outputString = "";

//get Parameters and display map input.
document.getElementById("createInputButton").onclick = function() {
  mapHeight = document.getElementById("mapHeight").value;
  mapWidth = document.getElementById("mapWidth").value;

  if(totalChars != 0){
    didInputParameters = true;

    totalChars = mapHeight * mapWidth;
    console.log("[Map Dimensions (H x W) : total chars]:: ", mapHeight, " x ", mapWidth, " : ", totalChars);

    //update the textarea size for easier input.
    //Spent a TON of time messing with this. Textarea does NOT scale consistently... period.
    document.getElementById("mapInput").setAttribute("rows", mapHeight);
    document.getElementById("mapInput").setAttribute("cols", mapWidth);
    //display the text area.
    document.getElementById("mapInput").setAttribute("class", "show textarea");
    document.getElementById("generateButton").setAttribute("class", "visible");

    document.getElementById("outputArea1").innerHTML = "Map Canvas created!";
  document.getElementById("outputArea2").innerHTML = "[MapHeight]: "+mapHeight+" | [MapWidth]: "+mapWidth+".";
} else {
  document.getElementById("outputArea1").innerHTML = "Please specify the Map Dimensions!";
  document.getElementById("outputArea2").innerHTML = "An example would be 10 by 10 for a play space of 100 total tiles.";
}
}

document.getElementById("mapInput").onkeyup = function() {
  notEmpty = true;
  if(charLimit(this.value)){
    console.log("[Map Input]:: character count incorrect!")
  };
}

//This reads the stuff in the input area and spreads into textAreaContent[].
document.getElementById("generateButton").onclick = function() {

  if(!notExactCharacters && notEmpty == true){
    //grab the entire string with no \n or spaces
  contentString = document.getElementById("mapInput").value.split("");
  //spread it into textAreaContent (split may be redundant).
  textAreaContent = [...contentString];
  console.log("[textAreaContent]:: ",textAreaContent);
  
  createMapData();
  }else{
    document.getElementById("outputArea1").innerHTML = "Character count incorrect in the Map Input box.";
    document.getElementById("outputArea2").innerHTML = "Please enter precisely "+ totalChars +" characters to proceed.";
  }
  
}

function charLimit(currentChars){
  if(currentChars.length != totalChars){
    notExactCharacters = true;
    return true;
  } else
  return false;
}

//Copies each character of textAreaContent[] of nth (mapWidth) index into a column array. Then pushes all columns into mapArray[].
sortColumns = () => {
  for(i=0; i<mapWidth; i++){
    //reset the column container
    column=[];

    //console.log("[i]:: ", i);

    for(charCursor=i; charCursor<=(totalChars-1);charCursor+=parseFloat(mapWidth)){
      //console.log("[charCursor]:: ", charCursor);
      let char = textAreaContent[charCursor];
      //console.log("[char]:: ", char);
      column.push(char);
    }

    mapArray.push(column);
  }
}

formatOutput = () => {
  numberOfColumns = mapArray.length;
  outputString += "mapArray = ";

  for(i=0; i<numberOfColumns; i++){
    outputString += "[";
    console.log("[outputString]:: ", outputString);

    for(a=0; a < mapHeight; a++){
      outputString += mapArray[i][a];
      //console.log("[mapArray[i[a]]]:: ", mapArray[i][a]);
    }
    outputString += "],";
  }
  let finalOutputString = outputString.slice(0, -1);
  finalOutputString += ";";
  outputColumnToConsole(finalOutputString);
}

outputColumnToConsole = (finalOutputString) => {
  document.getElementById("outputArea1").innerHTML += finalOutputString;
}


createMapData = () => {

  sortColumns();
  formatOutput();
  
}
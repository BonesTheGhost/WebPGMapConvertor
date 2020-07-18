console.log("[script.js]:: Attached and working properly!");

//Test string:: ####################$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbccccccccccccccccccccddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffgggggggggggggggggggghhhhhhhhhhhhhhhhhhhhiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkllllllllllllllllllllmmmmmmmmmmmmmmmmmmmmnnnnnnnnnnnnnnnnnnnnooooooooooooooooooooppppppppppppppppppppqqqqqqqqqqqqqqqqqqqq

//global scope so they can be referenced in later logic and update from anywhere.
let mapHeight = 0;
let mapWidth = 0;

//The arrays that we spread chars and names into later.
let libChars = [];
let libAreaNames = [];

//A control variable to make sure that the arrays have the same number of elements
//otherwise there will be characters with no corresponding library entries or visa versa.
let libEntryLengthMatch = false;
let containsWhiteSpace = false;

//for counting how many characters in the text area. 
let numberOfMapChars = 0;

let lastMapInput = "";
let lastMapInputArray = [];

let incorrectCharInInput = false;

//controlled for tooMany or tooLittle characters input into map space.
let notExactCharacters = false;
let notEmpty = false;

//to control for not entering map height or width.
let didInputParameters = false;

//For verifying the expected number of characters in the map.
let totalChars = mapHeight * mapWidth;

//Control variable for correctly incrementing through textAreaContent[].
let charCursor = 0;

//an array to hold the chars of textarea to increment through later.
let textAreaContent = [];

//The column holder array that will be appended and then reset for the next column.
let column = [];

//global map container
let mapArray = [];

//Used to control the correct output of the MapArray[] text.
let numberOfColumns = 0;
let outputController = 0;
let outputString = "";






//Receive the parameters, check for correct INT values, and check for 0's.
document.getElementById("createInputButton").onclick = function() {
  mapHeight = document.getElementById("mapHeight").value;
  mapWidth = document.getElementById("mapWidth").value;

  readLibraryEntries();

  if(!isNaN(mapHeight) && !isNaN(mapWidth)){
    console.log("NaN check passed")
    totalChars = mapHeight * mapWidth;

    //library checking function
    if(containsWhiteSpace == false){
      console.log("whitespace check passed")
      
      if(libEntryLengthMatch == true){
        console.log("libEntryLength check passed")
        
        if(totalChars != 0){
          console.log("Zero check passed")
          didInputParameters = true;
    
          //Update the Canvas Area instructions
          document.getElementById("canvasPrologue").setAttribute("class", "remove");
          document.getElementById("canvasTip1").setAttribute("class", "visible");
          document.getElementById("canvasTip2").setAttribute("class", "subText visible");
          console.log("[Map Dimensions (H x W) : total chars]:: ", mapHeight, " x ", mapWidth, " : ", totalChars);
    
          //update the textarea size for easier input.
          //Spent a TON of time messing with this. Textarea does NOT scale consistently... period.
          document.getElementById("mapInput").setAttribute("rows", mapHeight);
          document.getElementById("mapInput").setAttribute("cols", mapWidth);
          //display the text area.
          document.getElementById("mapInput").setAttribute("class", "show textArea");
          document.getElementById("generateButton").setAttribute("class", "visible");
    
          //re-hide the subtext warnings since things were entered correctly.
          document.getElementById("intWarning").setAttribute("class", "subText hidden");
          document.getElementById("libWarning").setAttribute("class", "subText hidden");
    
          //Show feedback to user so they know the program is doing the correct thing
          document.getElementById("outputArea1").innerHTML = "Map Canvas created!";
          document.getElementById("outputArea2").innerHTML = "[MapHeight]: "+mapHeight+" | [MapWidth]: "+mapWidth+".";
        } else {
          document.getElementById("outputArea1").innerHTML = "ERROR: Please specify valid (No 0's) Map Dimensions!";
          document.getElementById("outputArea2").innerHTML = "An example would be 10 by 10 for a play space of 100 total tiles.";
        }
      } else {
        document.getElementById("outputArea1").innerHTML = "ERROR: The number of characters does not match the number of areas.";
        document.getElementById("outputArea2").innerHTML = "Please correct the error to continue.";
      }
    } else {
      document.getElementById("outputArea1").innerHTML = "ERROR: There seems to be 'whitespace' and/or extra comma(s) in Characters or Area Names.";
      document.getElementById("outputArea2").innerHTML = "Please make sure there are no spaces and/or extra comma(s)!";
    }
  } else {
    document.getElementById("outputArea1").innerHTML = "ERROR: There seems to be text in the Map Dimensions.";
    document.getElementById("outputArea2").innerHTML = "Please enter numbers only!";
  }
}

readLibraryEntries = () => {
  libCharsString = document.getElementById("libChars").value.split(",");
  libAreaNameString = document.getElementById("libAreaNames").value.split(",");

  if (/\s/.test(libCharsString) || /\s/.test(libAreaNameString)) {
    containsWhiteSpace = true;
  } else {
    libChars = [...libCharsString];
    libAreaNames = [...libAreaNameString];

    //resetting the control variable IF there are no whitespaces OR "" in the array
    if(libChars.includes("") || libAreaNames.includes("")){
      //This causes the whitespace check to fail if an extra comma is present in the library inputs.
      //an extra comma means an array entry of "" which will be ignored by the /\s/.test above because the string
      //will end with ",".
      containsWhiteSpace = true;
      console.log("ERRANT COMMA INPUT")
    } else { 
      //resetting if it previously failed and the whitespace was removed.
      containsWhiteSpace = false;
      if(libChars.length == libAreaNames.length){
        libEntryLengthMatch = true;
        console.log("[LibLengthMatch]:: ", libEntryLengthMatch);
      }
    }
  } 
}

//These control the subText Displaying for the parameter areas.
document.getElementById("mapHeight").onclick = function() {
  document.getElementById("intWarning").setAttribute("class", "subText visible");
};
document.getElementById("mapWidth").onclick = function() {
  document.getElementById("intWarning").setAttribute("class", "subText visible");
};
document.getElementById("libChars").onclick = function() {
  document.getElementById("libWarning").setAttribute("class", "subText visible");
};
document.getElementById("libAreaNames").onclick = function() {
  document.getElementById("libWarning").setAttribute("class", "subText visible");
};

//This is the character input event for the text area. It happens every time a character key is lifted in textarea.
document.getElementById("mapInput").onkeyup = function() {
  notEmpty = true;

  //We pass the entire value of the textArea for length checking.
  charLimit(this.value);
}


//This goes through each character from the text input and compares their array indexes to the indexes of the user-predefined character library.
charLibCheck = () => {
  //reset to false
  incorrectCharInInput = false;

  //For testing characters, grab the input from the textArea and spread it into the array.
  //This way the array is spread at the end!
  lastMapInput = document.getElementById("mapInput").value;
  lastMapInputArray = [...lastMapInput];

  console.log(lastMapInputArray);
  for(i=0; i< lastMapInputArray.length; i++){

    if(libChars.includes(lastMapInputArray[i])){
      console.log("[Char included [lib] = [inp]:: ", libChars[0] ," = ", lastMapInputArray[i]);
    } else {
      incorrectCharInInput = true;
    }
  }
}

//IF the characters entered do not equal the totalChars possible
//(height x width), OR no dimensions have been entered in the inputs
//so the default 0's are still there, then simply output warning to console.
//Otherwise, split the content into textAreaContent[] and then pass to createMapData();
document.getElementById("generateButton").onclick = function() {
  /*
  //Check for incorrect characters. If that passes check for notEmpty and number of characters to match.
  if(!incorrectCharInInput){
      //console.log(!notExactCharacters && (notEmpty == true))
    if(!notExactCharacters && (notEmpty == true)){
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
  } else {
    document.getElementById("outputArea1").innerHTML = "Characters detected in Map Input Box that don't match character library.";
    document.getElementById("outputArea2").innerHTML = "Please enter only characters from your library.";
  }
  */

  //Run the check
  charLibCheck();

  //If exact chars, & not empty (redundant but w/e), AND the chars all match lib, grab the stuff and output.
  if(!notExactCharacters && (notEmpty == true)){
    if(incorrectCharInInput == false){

      //grab the entire string with no \n or spaces
      contentString = document.getElementById("mapInput").value.split("");
      //spread it into textAreaContent (split may be redundant).
      textAreaContent = [...contentString];
      console.log("[textAreaContent]:: ",textAreaContent);

      createMapData();
    } else {
      document.getElementById("outputArea1").innerHTML = "Characters detected in Map Input Box that don't match character library.";
      document.getElementById("outputArea2").innerHTML = "Please enter only characters from your library.";
    }
  } else {
    document.getElementById("outputArea1").innerHTML = "Character count incorrect in the Map Input box.";
    document.getElementById("outputArea2").innerHTML = "Please enter precisely "+ totalChars +" characters to proceed.";
  }
  
  
}



//This is a check for the number of characters within the textarea for the map. Triggered by 
//any key being pressed and released in textarea. If even a single even is triggered. notEmpty
//is set to true. The && guarantees no generate on empty initial area OR if the incorrect amount of chars entered.
function charLimit(currentChars){
  //Outputting the number of characters in the text area.

  numberOfMapChars = currentChars.length;

  //Updates the counter underneath the textarea.
  document.getElementById("charNum").innerHTML = numberOfMapChars + " characters entered.";

  //Reset notEmpty in case the box is empty
  if(currentChars.length == 0){
    notEmpty = false;
    console.log("[notEmpty]:: set to false. mapInput is empty");
  }

  //This verifies the correct TOTAL number of characters has been entered.
  if(currentChars.length != totalChars){
    notExactCharacters = true;
    return true;
  } else {
  notExactCharacters = false;
  return false;
  }
}

//Copies each character of textAreaContent[] of nth (mapWidth) index into a column array. Then pushes all columns into mapArray[].
sortColumns = () => {
  //reset the mapArray[] in case the user clicks 'generate' multiple times.
  mapArray = [];

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
//Actually CREATES the output text.
formatMapArrayOutput = () => {
  numberOfColumns = mapArray.length;
  //reset the output string in case the user clicks "generate" multiple times.
  outputString = "";
  outputString += "mapArray = [";

  for(i=0; i<numberOfColumns; i++){
    outputString += "[";

    for(a=0; a < mapHeight; a++){
      outputString += mapArray[i][a];
      //console.log("[mapArray[i[a]]]:: ", mapArray[i][a]);
    }
    outputString += "],";
  }
  let finalOutputString = outputString.slice(0, -1);
  finalOutputString += "];";
  return finalOutputString;
}
formatCharLibOutput = () => {
  numberOfChars = libChars.length;
  //reset the output string in case the user clicks "generate" multiple times.
  outputString = "";
  outputString += "myLibrary = [";

  for(i=0; i<numberOfChars; i++){
    outputString += "{char: " + "'" + libChars[i] + "'," + " name: " + "'" + libAreaNames[i] + "'},";
  }

  //remove the last comma
  let finalOutputString = outputString.slice(0, -1);

  finalOutputString += "];";
  return finalOutputString;
}

//DRAWS the output text to the console.
outputColumnToConsole = (finalMapArrayString, finalCharLibString) => {
  clearTheConsole();
  document.getElementById("outputArea1").innerHTML = finalMapArrayString;
  document.getElementById("outputArea2").innerHTML = finalCharLibString;
}

clearTheConsole = () => {
  document.getElementById("outputArea1").innerHTML = " ";
  document.getElementById("outputArea2").innerHTML = " ";
  document.getElementById("outputArea3").innerHTML = " ";
}

//Main function.
createMapData = () => {
  sortColumns();
  mapArrayString = formatMapArrayOutput();
  libraryString = formatCharLibOutput();
  outputColumnToConsole(mapArrayString, libraryString);
}

//This is the toggle Jquery for clicking on the CONSOLE H2
$('#consoleToggle').on('click', function() {
  
  let consoleWindow = document.getElementById("console");
  
  switch (consoleWindow.className) {
    case "console":

      console.log("I have clicked console");

      $(consoleWindow).addClass('clicked');
      $('#consoleToggleWindow').removeClass('hidden').addClass('visible');
      break;

    case "console clicked":
      console.log("I have unclicked");
      $(consoleWindow).addClass('unclicked').removeClass('clicked');
      $('#consoleToggleWindow').addClass('hidden').removeClass('visible');
      break;

    case "console unclicked":
      console.log("I have clicked");
      $(consoleWindow).addClass('clicked').removeClass('unclicked');
      $('#consoleToggleWindow').removeClass('hidden').addClass('visible');
      break;

    default:
      console.log("default");

  $(this).addClass('clicked');
  console.log("console clicked");
  }
});

//This is the Jquery for the box that appears underneath the console that the user can click to close the console.
$('#consoleToggleWindow').on('click', function() {
  $('#console').removeClass('clicked');
  $('#consoleToggleWindow').addClass('hidden').removeClass('visible');
})
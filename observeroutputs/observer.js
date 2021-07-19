var outputdata = []; //observed outputs and time stap array format
var list = []; //list of actiondata; 2D array format
var timestart;

//time when page loads
window.onload = () => {
timestart = Date.now();
}

var outputdataJSON = {}; //observed outputs and time stap JSON format
var listJSON = []; //list of actiondata of JSON

var random; 
//add actiondata to list
function action(clicked_id) {
    outputdataJSON = {action : clicked_id, timestamp : parseInt(Date.now() - timestart)};
    listJSON.push(outputdataJSON);
    
    outputdata = [" " + clicked_id, " " + (Date.now()-timestart)]
    list.push(outputdata);

    document.getElementById("actions").innerHTML = list;
}


// when "finish" button is pressed, a text file containing JSON list is downloaded
function save() { 
    random = JSON.stringify(listJSON);
    var blob = new Blob([random], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "outputs.txt");
}



// Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
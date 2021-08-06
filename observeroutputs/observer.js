var outputdata = []; //observed outputs and time stap array format
var list = []; //list of actiondata; 2D array format
var timestart;
var JSONlength = 0;

//time when page loads
window.onload = () => {
timestart = Date.now();
}

var outputdataJSON = {}; //observed outputs and time stap JSON format
var listJSON = []; //list of actiondata of JSON

//add actiondata to list
function action(clicked_id) {
    outputdataJSON = {action : clicked_id, timestamp : parseInt(Date.now() - timestart)};
    listJSON.push(outputdataJSON);
    
    outputdata = [" " + clicked_id, " " + (Date.now()-timestart)]
    list.push(outputdata);

    document.getElementById("actions").innerHTML = list;

    JSONlength += 1;
    
    console.log(listJSON);
}





/*
function save() { 
    var random = JSON.stringify(listJSON);
    var blob = new Blob([random], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "outputs.txt");
}
*/



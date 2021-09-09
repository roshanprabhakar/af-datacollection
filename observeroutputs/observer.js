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

    listJSON.push({'action' : clicked_id, 'timestamp' : parseInt(Date.now() - timestart)});
    list.push(clicked_id + " " + (Date.now()-timestart));
    JSONlength += 1;

    document.getElementById("actions").innerHTML = list;
    // console.log(listJSON);
}


/*
function save() {
    var random = JSON.stringify(listJSON);
    var blob = new Blob([random], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "outputs.txt");
}
*/



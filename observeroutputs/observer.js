
var list = []; //list of actiondata; 2D array format
var JSONlength = 0;
var listJSON = []; //list of JSON actiondata

//add actiondata to list
function action(clicked_id) {

    listJSON.push({'action' : clicked_id, 'timestamp' : Date.now()});
    list.push(`${clicked_id} ${Date.now()}`);
    JSONlength += 1;

    document.getElementById("actions").innerHTML = list;
}

/*
function save() {
    var random = JSON.stringify(listJSON);
    var blob = new Blob([random], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "outputs.txt");
}
*/



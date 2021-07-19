
function JSONtobit() {
    var timebuffer = new ArrayBuffer(listJSON.length);
    let dv1 = new DataView(timebuffer);

    var actionbuffer = new ArrayBuffer(listJSON.length);
    let dv2 = new DataView(actionbuffer);


    for (let i = 0; i < listJSON.length; i++) {
        dv1.setInt32(i, listJSON[i].timestamp);
        dv2.setBigInt64(i, listJSON[i].action);
    }

}
function bittoJSON() {
    //Do I make another JSON and combine the timestamp and action?
}

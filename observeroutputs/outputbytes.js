var timebuffer;
var dv1;
var actionbuffer;
var dv2;
var buf;
var bufview;
var arr = [];

function JSONtobit() {
    timebuffer = new ArrayBuffer(JSONlength * 4); //Array buffer for timestamps
    dv1 = new Int32Array(timebuffer); //dataview for timebuffer

    actionbuffer = new ArrayBuffer(JSONlength * 8); //Array buffer for actions
    dv2 = new BigInt64Array(actionbuffer); //dataview from actionbuffer
    
    for (let i = 0; i < dv1.length; i++) {
        dv1[i] = listJSON[i].timestamp;
        // dv2[i] = listJSON[i].action;
        arr[i] = stringbuff(listJSON[i].action);
    }
}

function stringbuff(str) {

    buf = new ArrayBuffer(str.length * 2);
    bufView = new Uint16Array(buf);
    for(let i = 0, strLen = str.length; i< strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
    
}





/*
function bittoJSON() {
    var outputs = [];
    var outJSON = {};
    for(let i = 0; i < (timebuffer.byteLength / 4); i++) {
        outJSON = {timestamp : dv1[i]};
        outputs.push(outJSON);
    }
    return outputs;
}
*/
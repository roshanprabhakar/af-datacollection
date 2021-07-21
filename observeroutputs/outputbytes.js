var buffer;
var dv1;
var key;
var arr = [];

function JSONtobuffer() {
    for(let i = 0; i < JSONlength; i++) {
        arr.push(actionkey(listJSON[i].action));
        arr.push(listJSON[i].timestamp);
    }

    buffer = new ArrayBuffer(arr.length * 4); //Array buffer for timestamps
    dv1 = new Int32Array(buffer);

    for(let i = 0; i < dv1.length; i++) {
        dv1[i] = arr[i];
    }

    console.log(buffer);
    console.log(dv1);

}

function actionkey(action) {
    key = 0;
    switch (action) {
        case "Happiness":
            key = 1;
            break;
        case "Laughing":
            key = 2;
            break;
        case "Applause":
            key = 3;
            break;
        case "Surprise":
            key = 4;
            break;
        case "Booing":
            key = 5;
            break;
        case "Stomping":
            key = 6;
            break;
        case "Anger":
            key = 7;
            break;
        case "Disgusted":
            key = 8;
            break;
        case "Crying":
            key = 9;
            break;
        case "Sadness":
            key = 10;
            break;
    }
    return key;
}





/*

var binaryarr = [];
var actionbit = [];
var bytes = [];


function bytefile() {
    for(let i = 0; i < JSONlength; i++) {
        binaryarr.push(actionbits(listJSON[i].action));
        binaryarr.push(((listJSON[i].timestamp).toString(2)));
        // actionbyte.push(actionbits(listJSON[i].action));
    }
    for(let x = 0; x < binaryarr.length; x++) {
        bytes.push(Math.ceil((binaryarr[x].length)/8));
    }
    console.log(binaryarr);
    console.log(bytes);

}

function actionbits(action) {
    actionbit = "";
    for(let i = 0; i < action.length; i++) {
        actionbit += action[i].charCodeAt(0).toString(2);
    }
    console.log((actionbit.toString()).length);
    return actionbit;
}



var timebuffer;
var dv1;
var actionbuffer;
var dv2;
var buf;
var bufview;
var arr = [];
var binaryarr = [];


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

function numbinary() {
    for(let i = 0; i < JSONlength; i++) {
        binaryarr[i] = (listJSON[i].timestamp).toString(2);
    }
    return binaryarr;
}



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
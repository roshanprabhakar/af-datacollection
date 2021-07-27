var buffer;
var dv1;
var key;
var outputarr = [];
var binaryarr = [];
var binarystr = "";
var binarystr2 = "";
var binaryascii = "";

function JSONtobuffer() {
    binaryarr = "";
    outputarr = [];
    binaryarr = [];
    binaryascii = "";
    for(let i = 0; i < JSONlength; i++) {
        outputarr.push(actionkey(listJSON[i].action));
        outputarr.push(listJSON[i].timestamp);
    }

    for(let i = 0; i < outputarr.length; i++) {
        binaryarr.push((outputarr[i].toString(2) + ""));
        binarystr += (outputarr[i].toString(2) + " ");
    }

    binaryarr = separate(binaryarr);
    for(let z = 0; z < binaryarr.length-1; z++) {
        binarystr2 += binaryarr[z] + " ";
    }
    binarystr2 += binaryarr[binaryarr.length-1];

    for (let a = 0; a < binarystr2.length; a++) {
        binaryascii += asciichar(binaryarr[a]);
    }
    

    var random = JSON.stringify(binaryascii);
    var blob = new Blob([random], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "outputs.txt");

    console.log(binarystr);
    console.log(binaryarr);
    console.log(dido);
    console.log(binarystr2);
    console.log(binaryascii);
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

function separate(arr) {
    var random = [];

    for(let i = 0; i < arr.length; i++) {
        var binlength = arr[i].length;
        var bin = "";
        var fill = "";
        if (binlength <= 7) {
            for(let y = 0; y < 7-binlength; y++) {
                fill += "0";
            }
            random.push(fill + arr[i]);
        } else {
            bin = arr[i];
            for(let x = 0; x < binlength; x+=7) {
                if(bin.length >= 7) {
                    random.push(arr[i].substr(x, x+7));
                    bin = bin.substr(7);
                } else {
                    for(let y = 0; y < 7-bin.length; y++) {
                        fill += "0";
                    }
                    random.push(fill + bin);
                }
            }
        }
    }
    return random;
}

function asciichar(bin) {
    var char = "";
    switch (bin) {
        case "0000001":
            char = "SOH";
            break;
        case "0000010":
            char = "STX";
            break;
        case "0000011":
            char = "ETX";
            break;
        case "0000100":
            char = "EOT";
            break;
        case "0000101":
            char = "ENQ";
            break;
        case "0000110":
            char = "ACK";
            break;
        case "0000111":
            char ="BEL";
            break;
        case "0001000":
            char = "BS";
            break;
        case "0001001":
            char = "HT";
            break;
        case "0001010":
            char = "LF";
            break;
        case "0001011":
            char = "VT";
            break;
        case "0001100":
            char = "FF";
            break;
        case "0001101":
            char = "CR";
            break;
        case "0001110":
            char = "SO";
            break;
        case "0001111":
            char = "SI";
            break;
        case "0010000":
            char = "DLE";
            break;
        case "0010001":
            char = "DC1";
            break;
        case "0010010":
            char = "DC2";
            break;
        case "0010011":
            char = "DC3";
            break;
        case "0010100":
            char = "DC4";
            break;
        case "0010101":
            char = "NAK";
            break;
        case "0010110":
            char = "SYN";
            break;
        case "0010111":
            char = "ETB";
            break;
        case "0011000":
            char = "CAN";
            break;
        case "0011001":
            char = "EM";
            break;
        case "0011010":
            char = "SUB";
            break;
        case "0011011":
            char = "ESC";
            break;
        case "0011100":
            char = "FS";
            break;
        case "0011101":
            char = "GS";
            break;
        case "0011110":
            char = "RS";
            break;
        case "0011111":
            char = "US";
            break;
        case "0100000":
            char = " ";
            break;
        case "0100001":
            char = "!";
            break;
        case "0100010":
            char = "\"";
            break;
        case "0100011":
            char = "#";
            break;
        case "0100100":
            char = "$";
            break;
        case "0100101":
            char = "%";
            break;
        case "0100110":
            char = "&";
            break;
        case "0100111":
            char = "'";
            break;
        case "0101000":
            char = "(";
            break;
        case "0101001":
            char = ")";
            break;
        case "0101010":
            char = "*";
            break;
        case "0101011":
            char = "+";
            break;
        case "0101100":
            char = ",";
            break;
        case "0101101":
            char = "-";
            break;
        case "0101110":
            char = ".";
            break;
        case "0101111":
            char = "/";
            break;
        case "0110000":
            char = "0";
            break;
        case "0110001":
            char = "1";
            break;
        case "0110010":
            char = "2";
            break;
        case "0110011":
            char = "3";
            break;
        case "0110100":
            char = "4";
            break;
        case "0110101":
            char = "5";
            break;
        case "0110110":
            char = "6";
            break;
        case "0110111":
            char = "7";
            break;
        case "0111000":
            char = "8";
            break;
        case "0111001":
            char = "9";
            break;
        case "0111010":
            char = ":";
            break;
        case "0111011":
            char = ";";
            break;
        case "0111100":
            char = "<";
            break;
        case "0111101":
            char = "=";
            break;
        case "0111110":
            char = ">";
            break;
        case "0111111":
            char = "?";
            break;
        case "1000000":
            char = "@";
            break;
        case "1000001":
            char = "A";
            break;
        case "1000010":
            char = "B";
            break;
        case "1000011":
            char = "C";
            break;
        case "1000100":
            char = "D";
            break;
        case "1000101":
            char = "E";
            break;
        case "1000110":
            char = "F";
            break;
        case "1000111":
            char = "G";
            break;
        case "1001000":
            char = "H";
            break;
        case "1001001":
            char = "I";
            break;
        case "1001010":
            char = "J";
            break;
        case "1001011":
            char = "K";
            break;
        case "1001100":
            char = "L";
            break;
        case "1001101":
            char = "M";
            break;
        case "1001110":
            char = "N";
            break;
        case "1001111":
            char = "O";
            break;
        case "1010000":
            char = "P";
            break;
        case "1010001":
            char = "Q";
            break;
        case "1010010":
            char = "R";
            break;
        case "1010011":
            char = "S";
            break;
        case "1010100":
            char = "T";
            break;
        case "1010101":
            char = "U";
            break;
        case "1010110":
            char = "V";
            break;
        case "1010111":
            char = "W";
            break;
        case "1011000":
            char = "X";
            break;
        case "1011001":
            char = "Y";
            break;
        case "1011010":
            char = "Z";
            break;
        case "1011011":
            char = "[";
            break;
        case "1011100":
            char = "\\";
            break;
        case "1011101":
            char = "]";
            break;
        case "1011110":
            char = "^";
            break;
        case "1011111":
            char = "_";
            break;
        case "1100000":
            char = "`";
            break;
        case "1100001":
            char = "a";
            break;
        case "1100010":
            char = "b";
            break;
        case "1100011":
            char = "c";
            break;
        case "1100100":
            char = "d";
            break;
        case "1100101":
            char = "e";
            break;
        case "1100110":
            char = "f";
            break;
        case "1100111":
            char = "g";
            break;
        case "1101000":
            char = "h";
            break;
        case "1101001":
            char = "i";
            break;
        case "1101010":
            char = "j";
            break;
        case "1101011":
            char = "k";
            break;
        case "1101100":
            char = "l";
            break;
        case "1101101":
            char = "m";
            break;
        case "1101110":
            char = "n";
            break;
        case "1101111":
            char = "o";
            break;
        case "1110000":
            char = "p";
            break;
        case "1110001":
            char = "q";
            break;
        case "1110010":
            char = "r";
            break;
        case "1110011":
            char = "s";
            break;
        case "1110100":
            char = "t";
            break;
        case "1110101":
            char = "u";
            break;
        case "1110110":
            char = "v";
            break;
        case "1110111":
            char = "w";
            break;
        case "1111000":
            char = "x";
            break;
        case "1111001":
            char = "y";
            break;
        case "1111010":
            char = "z";
            break;
        case "1111011":
            char = "{";
            break;
        case "1111100":
            char = "|";
            break;
        case "1111101":
            char = "}";
            break;
        case "1111110":
            char = "~";
            break;
        case "1111111":
            char = "DEL";
            break;

        /*
        case "10000000":
            char = ;
            break;
        case "10000001":
            char = ;
            break;
        case "10000010":
            char = ;
            break;
        case "10000011":
            char = ;
            break;
        case "10000100":
            char = ;
            break;
        case "10000101":
            char = ;
            break;
        case "10000110":
            char = ;
            break;
        case "10000111":
            char = ;
            break;
        case "10001000":
            char = ;
            break;
        case "10001001":
            char = ;
            break;
        case "10001010":
            char = ;
            break;
        case "10001011":
            char = ;
            break;
        case "10001100":
            char = ;
            break;
        case "10001101":
            char = ;
            break;
        case "10001110":
            char = ;
            break;
        case "10001111":
            char = ;
            break;
        case "10010000":
            char = ;
            break;
        case "10010001":
            char = ;
            break;
        case "10010010":
            char = ;
            break;
        case "10010011":
            char = ;
            break;
        case "10010100":
            char = ;
            break;
        case "10010101":
            char = ;
            break;
        case "10010110":
            char = ;
            break;
        case "10010111":
            char = ;
            break;
        case "10011000":
            char = ;
            break;
        case "10011001":
            char = ;
            break;
        case "10011010":
            char = ;
            break;
        case "10011011":
            char = ;
            break;
        case "10011100":
            char = ;
            break;
        case "10011101":
            char = ;
            break;
        case "10011110":
            char = ;
            break;
        case "10011111":
            char = ;
            break;
        case "10100000":
            char = ;
            break;
        case "10100001":
            char = ;
            break;
        case "10100010":
            char = ;
            break;
        case "10100011":
            char = ;
            break;
        case "10100100":
            char = ;
            break;
        case "10100101":
            char = ;
            break;
        case "10100110":
            char = ;
            break;
        case "10100111":
            char = ;
            break;
        case "10101000":
            char = ;
            break;
        case "10101001":
            char = ;
            break;
        case "10101010":
            char = ;
            break;
        case "10101011":
            char = ;
            break;
        case "10101100":
            char = ;
            break;
        case "10101101":
            char = ;
            break;
        case "10101110":
            char = ;
            break;
        case "10101111":
            char = ;
            break;
        case "10110000":
            char = ;
            break;
        case "10110001":
            char = ;
            break;
        case "10110010":
            char = ;
            break;
        case "10110011":
            char = ;
            break;
        case "10110100":
            char = "";
            break;
        case "10110101":
            char = ;
            break;
        case "10110110":
            char = ;
            break;
        case "10110111":
            char = ;
            break;
        case "10111000":
            char = ;
            break;
        case "10111001":
            char = ;
            break;
        case "10111010":
            char = ;
            break;
        case "10111011":
            char = ;
            break;
        case "10111100":
            char = ;
            break;
        case "10111101":
            char = ;
            break;
        case "10111110":
            char = ;
            break;
        case "10111111":
            char = ;
            break;
        case "11000000":
            char = ;
            break;
        case "11000001":
            char = ;
            break;
        case "11000010":
            char = ;
            break;
        case "11000011":
            char = ;
            break;
        case "11000100":
            char = ;
            break;
        case "11000101":
            char = ;
            break;
        case "11000110":
            char = ;
            break;
        case "11000111":
            char = ;
            break;
        case "11001000":
            char = ;
            break;
        case "11001001":
            char = ;
            break;
        case "11001010":
            char = ;
            break;
        case "11001011":
            char = ;
            break;
        case "11001100":
            char = ;
            break;
        case "11001101":
            char = ;
            break;
        case "11001110":
            char = ;
            break;
        case "11001111":
            char = ;
            break;
        case "11010000":
            char = ;
            break;
        case "11010001":
            char = ;
            break;
        case "11010010":
            char = ;
            break;
        case "11010011":
            char = ;
            break;
        case "11010100":
            char = ;
            break;
        case "11010101":
            char = ;
            break;
        case "11010110":
            char = ;
            break;
        case "11010111":
            char = ;
            break;
        case "11011000":
            char = ;
            break;
        case "11011001":
            char = ;
            break;
        case "11011010":
            char = ;
            break;
        case "11011011":
            char = ;
            break;
        case "11011100":
            char = ;
            break;
        case "11011101":
            char = ;
            break;
        case "11011110":
            char = ;
            break;
        case "11011111":
            char = ;
            break;
        case "11100000":
            char = ;
            break;
        case "11100001":
            char = ;
            break;
        case "11100010":
            char = ;
            break;
        case "11100011":
            char = ;
            break;
        case "11100100":
            char = ;
            break;
        case "11100101":
            char = ;
            break;
        case "11100110":
            char = ;
            break;
        case "11100111":
            char = ;
            break;
        case "11101000":
            char = ;
            break;
        case "11101001":
            char = ;
            break;
        case "11101010":
            char = ;
            break;
        case "11101011":
            char = ;
            break;
        case "11101100":
            char = ;
            break;
        case "11101101":
            char = ;
            break;
        case "11101110":
            char = ;
            break;
        case "11101111":
            char = ;
            break;
        case "11110000":
            char = ;
            break;
        case "11110001":
            char = ;
            break;
        case "11110010":
            char = ;
            break;
        case "11110011":
            char = ;
            break;
        case "11110100":
            char = ;
            break;
        case "11110101":
            char = ;
            break;
        case "11110110":
            char = ;
            break;
        case "11110111":
            char = ;
            break;
        case "11111000":
            char = ;
            break;
        case "11111001":
            char = ;
            break;
        case "11111010":
            char = ;
            break;
        case "11111011":
            char = ;
            break;
        case "11111100":
            char = ;
            break;
        case "11111101":
            char = ;
            break;
        case "11111110":
            char = ;
            break;
        case "11111111":
            char = ;
            break;
        */
    }
    return char;
}



















































/* ASCII table 


/*
ARRAY buffers


  buffer = new ArrayBuffer(arr.length * 4); //Array buffer for timestamps
    dv1 = new Int32Array(buffer);

    for(let i = 0; i < dv1.length; i++) {
        dv1[i] = arr[i];
    }

    console.log(buffer);
    console.log(dv1);





*/


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
var outputarr = [];
var binaryarr = [];
var binarystr = "";
var binarystr2 = "";
var binaryascii = "";

function toBuffer2() {

    /*
    holds the cumulative buffer as a string. k.length % 30 = 0
    for every group of 30 bits:
    bits 0 to 25 hold the timestamp
    bits 26-29 hold the action id
     */
    let k = "";

    for (let i = 0; i < JSONlength; i++) {
    
        //retrieve timestamp for entry 1
        let timestamp = listJSON[i].timestamp.toString(2);

        //enforce length 26 bits for all timestamp values 
        while(timestamp.length < 26) {
            timestamp = "0" + timestamp;
        }

        //retrieve action for entry i
        let action = actionkey(listJSON[i].action);

        // we add the "00" at the beginning to k length 32, exactly convertable to 2 utf16 characters
        k += "00" + timestamp + action;
    }
    console.log(k);

    //split k into utf16 parseable bytes held in f
    let f = [];
    for (let i = 0; i < k.length; i += 16) {
        /*
        no difference between string representation and int representation (i.e. '0000100000000000' and 2048)
        they both represent the same byte/ascii character
         */
        f.push(parseInt(k.substr(i, 16), 2));
    }

    //convert array of 16bit numbers to a utf16 string
    let final_text = "";
    for (let i = 0; i < f.length; i++) {
        final_text += String.fromCharCode(f[i]);
    }
    console.log(final_text);

    //write final_text to saveable file
    saveAs(new Blob([final_text], {type: "text/plain;charset=utf-16"}), "observer.txt");
}


function actionkey(action) {
    var key;
    switch (action) {
        case "Happiness":
            key = "0001";
            break;
        case "Sadness":
            key = "0010";
            break;
        case "Fear":
            key = "0011";
            break;
        case "Disgust":
            key = "0100";
            break;
        case "Anger":
            key = "0101";
            break;
        case "Contempt":
            key = "0110";
            break;
        case "Surprise":
            key = "0111";
            break;
        case "Laughing":
            key = "1000";
            break;
        case "Applause":
            key = "1001";
            break;
        case "Booing":
            key = "1010";
            break;
        case "Crying":
            key = "1011";
            break;
        
    }
    return key;
}



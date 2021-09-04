const action_key = new Map([
    ['Happiness', 0],
    ['Sadness', 1],
    ['Fear', 2],
    ['Disgust', 3],
    ['Anger', 4],
    ['Contempt', 5],
    ['Surprise', 6],
    ['Laughing', 7],
    ['Applause', 8],
    ['Booing', 9],
    ['Crying', 10],
]);

/*
where *(n) is the following operation on radix 10 integer n:
convert to binary, assign all digits to 1

we assume timestamp values all less than *(12 * 60 * 60 * 1000) ms (arbitrary) = 26 bits
we enforce 0 < action id ≤ 11, all action id less than *(11) = 4 bits
 */
function toBuffer() {

    /*
    holds the cumulative buffer as a string. k.length % 30 = 0
    for every group of 30 bits:
    bits 0 to 25 hold the timestamp
    bits 26-29 hold the action id
     */
    let k = "";

    for (let i = 0; i < JSONlength; i++) {

        //retrieve timestamp for entry i
        let timestamp = listJSON[i].timestamp.toString(2);

        //enforce length 26 bits for all timestamp values
        while (timestamp.length < 26) {
            timestamp = '0' + timestamp;
        }

        //retrieve action for entry i
        let action = action_key.get(`${listJSON[i].action}`).toString(2);

        //enforce length 4 bits for all action id
        while (action.length < 4) {
            action = '0' + action;
        }

        /*
        we add the '00' at the beginning to k length 32, exactly convertable to 2 utf16 characters
         */
        k += '00' + timestamp + action;
    }

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

    //write final_text to saveable file
    saveAs(new Blob([final_text], {type: "text/plain;charset=utf-16"}), "observer.txt");
}

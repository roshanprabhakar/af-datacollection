// // function str2ab(str) {
// //     var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
// //     var bufView = new Uint16Array(buf);
// //     for (var i=0, strLen=str.length; i < strLen; i++) {
// //       bufView[i] = str.charCodeAt(i);
// //     }
// //     return buf;
// //   }



//   function ab2str(buf) {
//     return String.fromCharCode.apply(null, new Int16Array(buf));
//   }


  

// //   function getCharCodes(s){
// //     let charCodeArr = [];
    
// //     for(let i = 0; i < s.length; i++){
// //         let code = s.charCodeAt(i);
// //         charCodeArr.push(code);
// //     }
    
// //     return charCodeArr;
// // }

// // let arr = ['alpha', 'bravo', 'charlie'];

// let art = ["cool", "1", "hello", "yes" ];

// let name = "John"


// // let removeComma= (params) => {
// //    console.log(params.join(' '));
// // }

// // removeComma(art);




// // array.join(' ');


// // console.log(array.join);




// // var x = 0;

// // while(x < faceMeshArray.length){ 
// //     faceMeshArray[x] = faceMeshArray[x].toFixed(2); 
// //     x++
// // }



// // let buffer = new ArrayBuffer(16);

// // console.log(buffer.byteLength);




























// let meshPacket = new ArrayBuffer(8)  //4 * 3 * 468 * 10 








let meshPacketBuffer = new ArrayBuffer(8 + (meshBuffer.length * 10 * 8));

var meshPacketBufferView = new Float64Array(meshPacketBuffer); //divides by 8





var a = new Int8Array( [ 1, 2, 3 ] );
var b = new Int8Array( [ 4, 5, 6 ] );

var c = new Int8Array(a.length + b.length);
c.set(a);
c.set(b, a.length);
import { faceMeshArray } from './index.js';


// I need access to the mesh data in here. I want to then use this to push it into reactorGUI.html. Is there a way that I can pass the mesh data directly into the html file. 
// I then want to run the two html files simultaneously so that the data will be being pushed to the reactor html file as it is collected. How can I do this

//Make another array buffer and include the time stamp data, make the first 4/5 bytes to store timestamp info, like the first 8 bytes
//Continue collecting packets until 100 is reached and store them into an array

// packet = timestamp + meshByteData

//packet is an array buffer
import * as facemesh_module from '@tensorflow-models/facemesh';
import * as tf from '@tensorflow/tfjs';
import Stats from 'stats.js';
import 'babel-polyfill';


import { drawPoint, setStatusText, } from './utils/demoUtils';
import { variable } from "@tensorflow/tfjs";
import { validateConfig } from 'face-api.js';






//this should work now


// signaling server
const HOST = 'wss://vast-earth-73765.herokuapp.com/';


// Camera stream video element
let video;
let videoWidth = 600;
let videoHeight = 800;



//Packet Array
var packetArray = [];

// Empty array for the mesh property of faceDetection
var faceMeshArray = [];

//Empty array for the scaledMesh Property of faceDetection
var scaledFaceMeshArray = [];

//Global counter used in the scrapeMesh function to limit the number of data collected by each of the arrays above
var globalCounter = 0;



// Canvas
let faceDetection = null;
let illustration = null;
let canvasScope;

// ML model
let facemesh;

// Misc
const stats = new Stats();

// references for render setup
const canvas = document.getElementById('output');
const videoCtx = canvas.getContext('2d');

async function scrape_mesh() {

    if (packetArray.length >= 100) return;


    // draw video
    videoCtx.save();
    videoCtx.scale(-1, 1);
    videoCtx.translate(-videoWidth, 0);
    videoCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
    videoCtx.restore();

    // get face information
    const input = tf.browser.fromPixels(canvas);
    faceDetection = await facemesh.estimateFaces(input, false, false);
    input.dispose();

    
    if (faceDetection && Object.keys(faceDetection).length === 1) {
        //  console.log(faceDetection);
        for (let i = 0; i < faceDetection[0].scaledMesh.length; i++) {
            let p = faceDetection[0].scaledMesh[i];
            drawPoint(videoCtx, p[1], p[0], 2, 'red');
        }


 

        if (globalCounter < 10) {

            //Push both Mesh and Scaled Mesh data to an empty array
            faceMeshArray.push(faceDetection[0].mesh);
            scaledFaceMeshArray.push(faceDetection[0].scaledMesh);

            globalCounter++;

        } else if (globalCounter === 10) {

            // buffer for 10 frames
            var meshBuffer = new ArrayBuffer(56160); //4 * 3 * 468 * 10
            var meshBufferView = new Float32Array(meshBuffer); //meshBuffer divided by 4

            // write all 10 frames to meshBuffer
            for (let frame = 0; frame < 10; frame++) {
                for (let point = 0; point < 468; point++) {
                    for (let dimension = 0; dimension < 3; dimension++) {

                        meshBufferView[frame * 468 * 3 + point * 3 + dimension] = faceMeshArray[frame][point][dimension];
                    }
                }
            }


            //timestamp @ collection completion
            var timeBuffer = new ArrayBuffer(8);
            var timeBufferView = new Float64Array(timeBuffer); //length 1 view
            timeBufferView[0] = Date.now();

            //packet buffer
            var meshPacketBuffer = new ArrayBuffer(timeBuffer.byteLength + meshBuffer.byteLength);
            var meshPacketBufferView = new Int8Array(meshPacketBuffer);

            //write timestamp bytes to packet
            timeBufferView = new Int8Array(timeBuffer); //length 8 view
            for (let i = 0; i < 8; i++) {
                meshPacketBufferView[i] = timeBufferView[i];
            }

            //write frame data to packet
            meshBufferView = new Int8Array(meshBuffer);
            for (let i = 0; i < 56160; i++) {
                meshPacketBufferView[i + 8] = meshBufferView[i];
            }

            // Push concatenated meshBufferView and timestamp array buffer together to a normal array
            packetArray.push(meshPacketBufferView);
        }
    }

    // End monitoring code for frames per second
    stats.end();

    // loop back
    setTimeout(scrape_mesh, 10);
}


/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
            'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;

    video.srcObject = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
        },
    });

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadVideo() {
    const video = await setupCamera();
    video.play();

    return video;
}

/**
 * Sets up a frames per second panel on the top-left of the window
 */
function setupFPS() {
    stats.showPanel(0);
    document.getElementById('video-container').appendChild(stats.dom);
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off pose transmission device.
 */

export async function bindPage() {
    // toggleLoadingUI(true);
    setStatusText('Loading FaceMesh model...');

    facemesh = await facemesh_module.load();

    setStatusText('Setting up camera...');
    try {
        video = await loadVideo();
    } catch (e) {
        let info = document.getElementById('info');
        info.textContent = 'this device type is not supported yet, ' +
            'or this browser does not support video capture: ' + e.toString();
        info.style.display = 'block';
        throw e;
    }

    document.getElementById("loading").remove();
    setupFPS();

    // toggleLoadingUI(false);
    configureRender();
}

/**
 * Sets up local and receiving renderers
 */
function configureRender() {
    canvas.width = videoWidth;
    canvas.height = videoHeight;
}

bindPage().then(scrape_mesh);
// bindPage();



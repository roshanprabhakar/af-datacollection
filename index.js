/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as facemesh_module from '@tensorflow-models/facemesh';
import * as tf from '@tensorflow/tfjs';
import Stats from 'stats.js';
import 'babel-polyfill';

import {drawPoint, setStatusText,} from './utils/demoUtils';
import {variable} from "@tensorflow/tfjs";

// signaling server
const HOST = 'wss://vast-earth-73765.herokuapp.com/';

// Camera stream video element
let video;
let videoWidth = 600;
let videoHeight = 800;

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
        console.log(faceDetection)
        for (let i = 0; i < faceDetection[0].scaledMesh.length; i++) {
            let p = faceDetection[0].scaledMesh[i];
            drawPoint(videoCtx, p[1], p[0], 2, 'red');
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

# Audience Feedback Data Collection Software

---

## Program goal
Provide a mechanism to collect and store data pertaining to audience reactions. \
Example entry:
```shell
facemesh data, reaction vector
```

Neither data component (input or output) has been finalized, though a facemesh input
would probably be the best form of input considering that a facemesh encompasses all 
possible facial information (i.e. the emotional state is derived from a facemesh).
The output component is still completely undecided. This vector should consist of 
measurements for the presence of laughter, dissaproval through booing, yelling, etc.
as well as other reactions that may occur in conjunction with the facemesh's representation.

Example entry:
```shell
facemesh data, (1, 0, 0, 1)
```
If we decide that position 0 entails laughing, 1 entails stomping, 2 entails crying,
and 3 entails clapping, this output vector indicates that the actual truth reactions
occurring in conjunction with the facemesh data are: laughing and clapping. The reactions
this vector represents, as well as the mapping of reaction type to vector index, are
currently undecided.

### What this library currently contains
A simple website which processes camera data and extracts a facemesh using the blazeface library.
Please go look at the code and try to understand as much as possible, even playing around with
edits.

Area of main focus:
```shell 
index.js: scrape_mesh
```
Please understand the ```faceDetection``` object, it is the key structure which holds
the facemesh that we need to store. Try printing this structure to console and seeing 
what data is stored in it.

### What is yet to be done

* Decide what the output component of each data entry will represent (what reactions need to be captured)
* Implement a video player in the center of the webpage playing some entertainment content that 
  a subject can react to
* implement the storage of facemesh data along with some reported reactionary vector (a good first
  step to this would be to write all the facemeshes to some file in an accessible format).
* PLEASE POPULATE THIS LIST AS YOU SEE FIT

## Installation + Usage
First make sure you have yarn installed (javascript package manager).
```shell
brew install yarn
```

Then clone this repository:
```shell
git clone https://github.com/roshanprabhakar/af-datacollection.git
```

Enter the created directory and download all necessary dependencies
```shell
yarn install
```

To launch the website on your localhost, simply run:
```shell
yarn watch
```

Your browser should open and two video windows should appear: the first is of your
webcam feed, the second is the extracted facemesh painted over the webcam feed. To
play around with the code, and to undersatnd different variables, print them to console
using ```console.log()```, and open the console. To do this in Chrome, click inspect element, 
then navigate to console in the upper menu. Objects are displayed here in their json representation. 
I suggest you print the ```faceDetection``` object to console and play around with it.

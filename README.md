# CMU-Network-Game
A course that covers computer network basics disguised as a game!

# Usage 
## Running the Files
To run the files, you will need to host a local server on your computer. This is to allow the HTTP requests to fire properly.

### Python Web Server:
Download Python if you haven't already. Go into the directory of the 'index.html' file and run the command `python -m SimpleHTTPServer 8000` in command line. Load the URL `http://localhost:8000/` into your browser.

### Node.JS Web Server:
Install `http-server` via `npm`: `npm install http-server -g`. You can now run this server through the command line through the simple command `http-server`. Load the URL `http://localhost:8080` into your browser. See https://www.npmjs.com/package/http-server for more details.

### Brackets Text Editor:
Download brackets at http://brackets.io/. Brackets editor has a built in local server that can host your code (Live Preview). 

## Tips 
- Run the files on Chrome, which supports WebGL and advanced HTML5 Canvas features. Chrome is also well suited for the CPU intensive processes of rendering the game.
- Avoid opening and closing Developer Tools on Chrome too often. It forces the game to recalculate and re-render the game world size and positions, which may slow down your computer.

# Code Overview
## Folders:
The **Modules** folder contains many of the custom-written code that helps processes this game specifically. This includes the following files thus far:
- `loader.js`: Loads all the *Modules* files by manipulating the index.html dynamically.
- `camera.js`: Defines and adds functionality for moving the in-game camera.
- `dialogue.js`: Handles rendering the dialogue animations, content, and position.
- `guide.js`: Defines and adds functionality for moving the game guide sprite.
- `lessons.js`: Defines arrays storing the dialogue of different sprites.
- `map.js`: Reads in the JSON files containing map data, and initializes it into the game world.
- `packet.js`: Renders an animation of a packet stream by calculating positions and velocities.
- `sprite.js`: Defines a basic framework for adding in-game sprites. Includes more functions defining different types of sprite movement.
- `stages.js`: Includes stages representing network functions. Functions are used to populate an area with sprites in a pre-determined way.
- *Assets*: Includes global assets used in various module files. This includes `PNG` graphics and `JSON-TP-HASH` spritesheets for character graphics. A big thanks to [Maggie Yuan](https://www.pinterest.com/magyuanca/) for contributing to the graphics!

The **Graphics** folder contains external graphics that are used in this game. A big thanks to the [Kenney Group](http://kenney.nl/) for contributing to the graphics!

The **Stage** folders are numbered numerically. These contain the individual lessons that are designed to teach specific networking concepts. Every folder contains the following basic elements:
- *Map Folder*: Contains assets used in the stage. Will include `.png` graphics `.tmx` / `.json` map files.
- `Preload.js`: Preloads all the game assets into the game state.
- `Stage.js`: Creates all the game objects and runs the game event loop.


The **Testing** folder contains scripts used primarily to test new modules in the *Modules* folder before deploying it to the *Stage* folders.



# FAQ 
*Question: When I try to run the files, I see this error in my console:*
```
XMLHttpRequest cannot load file...Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```
*Why can't it load the files?*

Answer: Look at the **Usage** section. You need to host a http-server to run the files.

# CMU-Network-Game
A course that covers computer network basics disguised as a game!

# How do I use this? 
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

# What am I downloading?
### Core Files:
- `index.html`: Loads in all the scripts and initializes a `new Phaser.Game`. Adds all the `Preload.js` and `Stage.js` files to the game state. Adds a `Boot.js` file to the game state. Starts the `Boot.js` file.
- `Boot.js`: Boots up the game. Currently, not preloading bar is initialized, but this may change in future versions. `Boot.js` also starts up a developer defined `Preload.js` file.
- `SaveCPU.js`: An external Phaser plugin that decreases CPU usage when rendering frames.
- `phaser.js`: A copy of the most recent phaser library.
- `README.md`: What you're reading right now!


### Folders:
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

# How can I make my own lessons?
Before starting to develop, it's good to familiarize yourself with [Phaser](https://phaser.io/) first. Phaser is extremely well documented, with hundreds of code samples and official public [documentation](https://photonstorm.github.io/phaser-ce/). The basic Phaser event loop goes like this:

### Preload: 
This function is called first. It should contain code to handle the loading of assets needed by your game. While any code can be written here, it is suggested to keep it simply to loading assets. 
###### Function Syntax:
```javascript
create: function () {
...
},
```

###### Example Body Code:
```javascript
this.load.tilemap('map', 'Stage2/Map/map_2.json', null, Phaser.Tilemap.TILED_JSON);  
this.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
this.load.image('ConnectionTable', 'Modules/Assets/small_screens.png'); 
```
The structure is as follows. The first parameter in `'` is the key (for example, `'ConnectionTable'`), which is mapped to a URL of the asset (for example, `'Modules/Assets/small_screens.png'`). The parameters after are usually extra parameters to processs more complicated types of assets, such as JSON hash arrays or tilemaps.

### Create: 
In this function, developers can safely create [sprites](http://phaser.io/docs/2.4.4/Phaser.Sprite.html), particles and anything else needed that may use assets the preload will now have loaded. Typically this function would contain the bulk of the set-up code, creating game objects and the like. 
###### Function Syntax:
```javascript
create: function () {
    ...
},
```
###### Example Body Code:
```javascript
this.physics.startSystem(Phaser.Physics.ARCADE); //starts the physics system
        addControls(this); //function that maps keyboard input to game events

        initMap('map', ['tileset1', 'tileset2'], this); //function to render map
        initDialogue(this); //function to set up dialogue sprites
```

Many of the basic things needed to set up your game world will have been pre-written in a `.js` file in the **Modules** folder.

### Update: 
The update functions are called every frame. So on a desktop that'd be around 60 time per second. In update this is where developers do things like listen or poll for input to move a player, check for object collision, etc. It's the heart of the game, and it is a continous loop that makes the game come alive. 
###### Function Syntax:
```javascript
update: function () {
    ...
},
```

###### Example Body Code:
```javascript
    updateDialoguePos(this); //updates the position of the dialogue box based on input
    pollCameraControls(this); //checks for keyboard input to move camera 
    ...
    addCollision(NAT, this); //checks for collision between a sprite called "NAT" and the game world (this)

    updatePacketPos(this.packetStream1, this); //updates the position of the packets in network traffic
```

# FAQ 
*Question: When I try to run the files, I see this error in my console:*
```
XMLHttpRequest cannot load file...Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```
*Why can't it load the files?*

Answer: Look at the **Usage** section. You need to host a http-server to run the files.

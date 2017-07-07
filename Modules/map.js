let map;
let jsonObj;
let background;
let collision;
let objects;
let layers = [background, collision, objects];

/**
 * Initializes the map and the three game layers.
 * 
 * @param {String} mapName      - The key to the JSON map file cached in the game state
 * @param {String} tileSets     - The key(s) to the tileset images used in the JSON file
 * @param {object}   gameInstance - A copy of the game variable
 */
function initMap(mapName, tileSets, gameInstance){
    let mapData = jsonObj;
    let tileWidth = mapData.tilewidth;
    let tileHeight = mapData.tilewidth;
        
    map = gameInstance.add.tilemap(mapName, tileWidth, tileHeight);
        
    for (let i = 0; i < Math.min(mapData.layers.length, tileSets.length); i++){
        map.addTilesetImage(mapData.tilesets[i].name, tileSets[i]);
    }
    
    for (let i = 0; i < layers.length; i++ ){
        layers[i] = map.createLayer(mapData.layers[i].name);
        layers[i].resizeWorld();
        
        if (i != 0)
            map.setCollisionBetween(1, 10000, true, layers[i]);
    }
    
    gameInstance.camera.setPosition(gameInstance.world.centerX - window.innerWidth/2, gameInstance.world.centerY - window.innerHeight/2);
}

/**
 * An internal function used to read in a JSON file.
 * Sets jsonObj to the parsed value.
 * 
 * @param {String} file - The file path of the JSON file to be read
 */
function readJSON(file){
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            jsonObj = JSON.parse((rawFile.responseText));
        }
    }
    rawFile.send(null);
}

/**
 * Sets a sprite to collide with the collision and object layers.
 * 
 * @param {object} sprite       - The sprite that collides with the game layers
 * @param {object}   gameInstance - A copy of the game variable.
 */
function addCollision(sprite, gameInstance){
    for (let i = 1; i < layers.length; i ++)
        gameInstance.physics.arcade.collide(sprite, layers[i]);
}


    

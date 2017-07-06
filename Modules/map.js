let map;
let jsonObj;
let background;
let collision;
let objects;
let layers = [background, collision, objects];

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

function addCollision(sprite, layerArr, gameInstance){
    for (let i = 1; i < layerArr.length; i ++)
        gameInstance.physics.arcade.collide(sprite, layerArr[i]);
}


    

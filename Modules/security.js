//ACL Stage Sprites
let ACLSprite;
let ACLScreen;

//Stateful Firewall Stage Sprites
let statefulFWSprite;
let statefulFWSprite2;
let connectionTable;

//IDS/IPS Sprite
let IDS;

//The sprite the camera is focused on
let FOCUSED_SPRITE = null;

/**
 * Sets the room for an ACL by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageACL(centerX, centerY, gameInstance){
    ACLScreen = addSprite(["Access Control List"], ["I am an ACL."], 'ACLScreen', centerX, centerY, 0.25, 0, true, gameInstance).instance;
    
    ACLSprite = addSprite(["Stateless Firewall"], ["I am a stateless firewall."], 'ACLSprite', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(ACLSprite, gameInstance);
}

/**
 * Sets the room for an Stateful Firewall by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageStatefulFW(centerX, centerY, gameInstance){
    ACLScreen = addSprite(["Access Control List"], ["I am an ACL."], 'ACLScreen', centerX + 20, centerY, 0.25, 0, true, gameInstance).instance;

    connectionTable = addSprite(["Connection Table"], ["I am an connnection table."], 'ConnectionTable', centerX - 170, centerY + 40, 0.25, 0, true, gameInstance).instance;
    
    statefulFWSprite = addSprite(["Stateful Firewall"], ["I am Stateful."], 'StatefulFW', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;    
    initPlatformerSprite(statefulFWSprite, gameInstance);

    statefulFWSprite2 = addSprite(["Stateful Firewall"], ["I am Stateful."], 'StatefulFW', centerX - 100, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance; 
    initPlatformerSprite(statefulFWSprite2, gameInstance);
}

/**
 * Sets the room for an IDS by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageIDS(centerX, centerY, gameInstance){
    IDS = addSprite(["Intrusion Detection"], ["I am an IDS."], 'robot', centerX + 20, centerY, 0.2, 0, true, gameInstance).instance;
    IDS.events.onInputDown.add(toggleClicked, {sprite: IDS}); 
}

/**
 * An internal function that is attached to the sprites in the rooms. 
 * Once a sprite is clicked, this function is called, and changes FOCUSED_SPRITE, the sprite the camera is following, to the recently clicked sprite. 
 */
function toggleClicked(){
    if (dialogueOpen == "moving"){
        FOCUSED_SPRITE = this.sprite;
    }
}

/**
 * An internal function that is used to initialize platformer sprites.
 * Attaches animations to the sprite, and attaches the toggleClicked() function to an input listener.
 * Attaches platformer sprite movement to the sprite as well.
 * 
 * @param {object} sprite       - The sprite to initialize
 * @param {object} gameInstance - A copy of the game variable
 */
function initPlatformerSprite(sprite, gameInstance){
    sprite.animations.add('idle',["idle"],1,true);  
    sprite.animations.add('run',["walk_1", "walk_2"],5,true);
    
    sprite.events.onInputDown.add(toggleClicked, {sprite: sprite}); 
    
    gameInstance.time.events.loop(Phaser.Timer.SECOND * 1, movePlatformerSprite, {sprite: sprite, defaultFollow:[500, 500], gameInstance: gameInstance});   
}




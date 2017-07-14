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
    let ACLScreen = addSprite(["Access Control List"], ACLScreenDialogue, 'ACLScreen', centerX, centerY, 0.3, 0, true, gameInstance).instance;
    
    let ACLSprite = addSprite(["Stateless Firewall"], ACLSpriteDialogue, 'ACLSprite', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(ACLSprite, gameInstance);
    
    return ACLSprite;
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
    let connectionTable = addSprite(["Connection Table"], connectionTableDialogue, 'ConnectionTable', centerX, centerY + 20, 0.35, 0, true, gameInstance).instance;
    
    let statefulFWSprite = addSprite(["Stateful Firewall"], statefulFWSpriteDialogue, 'StatefulFW', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;    
    initPlatformerSprite(statefulFWSprite, gameInstance);
    
    return statefulFWSprite;
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
    let IDS = addSprite(["Intrusion Detection"], IDSDialogue, 'IPS', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(IDS, gameInstance);
        
    return IDS;
}


function setStageRouter(centerX, centerY, gameInstance){
    let routingTable = addSprite(["Routing Table"], routingTableDialogue, 'routingTable', centerX, centerY, 0.32, 0, true, gameInstance).instance; 
    routingTable.events.onInputDown.add(toggleClicked, {sprite: routingTable}); 


    let routingTableSprite = addSprite(["Routing Table"], routingTableSpriteDialogue, 'routingTableSprite', centerX - 40, centerY, PLATFORMER_SCALE, 200 , true, gameInstance).instance;
    initPlatformerSprite(routingTableSprite, gameInstance);
    
    return {routingTableSprite: routingTableSprite, routingTable: routingTable};
}

function setStageProxy(centerX, centerY, gameInstance){
    let proxy = addSprite(["Proxy"], proxyDialogue, 'proxy', centerX, centerY + 140, 0.35, 0, true, gameInstance).instance; 
    proxy.events.onInputDown.add(toggleClicked, {sprite: proxy}); 
    return proxy;
}

function setStageNAT(centerX, centerY, gameInstance){
    let NAT = addSprite(["NAT"], NATDialogue, 'NAT', centerX + 40, centerY, PLATFORMER_SCALE, 200 , true, gameInstance).instance;
    initPlatformerSprite(NAT, gameInstance);
    
    let NATScreen = addSprite("","", 'NATScreen', centerX, centerY, 0.5, 0, false, gameInstance);
    
    return NAT;
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
        
    gameInstance.time.events.loop(Phaser.Timer.SECOND * 1, toggleCameraFocus, {sprite: sprite, isPlatformerSprite: true, gameInstance: gameInstance});   
}




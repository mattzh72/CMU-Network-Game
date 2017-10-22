/**
 * Loads in the assets required for network functions.
 * 
 * @param {Array} names - An array of the names of the network functions that need assets loaded.
 * @param {object} gameInstance - Holds a copy of the game instance.
 */
function preloadNetworkFuncAssets(names, gameInstance) {
    if (names.includes("ACL")) {
        gameInstance.load.atlas('ACLSprite', 'Modules/Assets/ACL.png', 'Modules/Assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        gameInstance.load.image('ACLScreen', 'Modules/Assets/ACL_screen.png');
    }

    if (names.includes("StatefulFW")) {
        gameInstance.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/Assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        gameInstance.load.image('ConnectionTable', 'Modules/Assets/small_screens.png');
    }

    if (names.includes("IPS")) {
        gameInstance.load.atlas('IPS', 'Modules/Assets/IPS.png', 'Modules/Assets/IPS.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }

    if (names.includes("Router")) {
        gameInstance.load.atlas('routingTableSprite', 'Modules/Assets/routing_table_sprite.png', 'Modules/Assets/routing_table_sprite.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        gameInstance.load.image('routingTable', 'Modules/Assets/routing_table.png');
        gameInstance.load.image('routingTableContent', 'Modules/Assets/routing_table_content.png');
    }

    if (names.includes("Proxy")) {
        gameInstance.load.atlas('proxy', 'Modules/Assets/proxy.png', 'Modules/Assets/proxy.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }
    
    if (names.includes("NAT")) {
        gameInstance.load.atlas('NAT', 'Modules/Assets/NAT.png', 'Modules/Assets/NAT.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        gameInstance.load.image('NATScreen', 'Modules/Assets/NAT_screen.png');
    }
}

/**
 * Sets the room for an ACL by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageACL(centerX, centerY, gameInstance) {
    let ACLScreen = addSprite(["Access Control List"], ACLScreenDialogue, 'ACLScreen', centerX, centerY, 0.3, 0, true, gameInstance).instance;

    let ACLSprite = addSprite(["Stateless Firewall"], ACLSpriteDialogue, 'ACLSprite', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(ACLSprite, gameInstance);

    return ACLSprite;
}

function setStageACLText(text1, text2){
    let screenTxt = "";
    let spriteTxt = "";
    
    if (text1){
        screenTxt = text1;
    }
    
    if (text2) {
        spriteTxt = text2;
    }
    
    ACLScreenDialogue = screenTxt;
    ACLSpriteDialogue = spriteTxt;
}


/**
 * Sets the room for an Stateful Firewall by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageStatefulFW(centerX, centerY, gameInstance) {
    let connectionTable = addSprite(["Connection Table"], connectionTableDialogue, 'ConnectionTable', centerX, centerY + 20, 0.35, 0, true, gameInstance).instance;

    let statefulFWSprite = addSprite(["Stateful Firewall"], statefulFWSpriteDialogue, 'StatefulFW', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(statefulFWSprite, gameInstance);

    return statefulFWSprite;
}

function setStageStatefulFWText(text1, text2){
    let screenTxt = "";
    let spriteTxt = "";
    
    if (text1){
        screenTxt = text1;
    }
    
    if (text2) {
        spriteTxt = text2;
    }
    
    connectionTableDialogue = screenTxt;
    statefulFWSpriteDialogue = spriteTxt;
}


/**
 * Sets the room for an IPS by adding the appropriate sprites and initializing their movements.
 * All the positions of the sprites in this room are relative to params centerX and centerY.
 * 
 * @param {number} centerX      - The x position of the center of the room
 * @param {number} centerY      - The x position of the center of the room
 * @param {object} gameInstance - A copy of the game variable
 */
function setStageIPS(centerX, centerY, gameInstance) {
    let IPS = addSprite(["Intrusion Detection"], IPSDialogue, 'IPS', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(IPS, gameInstance);

    return IPS;
}

function setStageIPSText(text1){
    let spriteTxt = "";
    
    if (text1){
        spriteTxt = text1;
    }
    
    IPSDialogue = spriteTxt;
}


function setStageRouter(centerX, centerY, gameInstance) {
    addRoomDecor(centerX, centerY, 0.32, 'routingTable', gameInstance, {
        key: 'routingTableContent',
        scale: 0.7
    }, {
        title:"Routing Table",
        content: routingTableDialogue,
    });

    let routingTableSprite = addSprite(["Routing Table"], routerDialogue, 'routingTableSprite', centerX - 40, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(routingTableSprite, gameInstance);

    return {
        routingTableSprite: routingTableSprite,
    };
}

function setStageRouterText(text1, text2){
    let screenTxt = "";
    let spriteTxt = "";
    
    if (text1) {
        screenTxt = text1;
    }
        
    if (text2){
        spriteTxt = text2;
    }
    
    routingTableDialogue = screenTxt;
    routerDialogue = spriteTxt;
}

function setStageProxy(centerX, centerY, gameInstance) {
    let proxy = addSprite(["Proxy"], proxyDialogue, 'proxy', centerX, centerY + 140, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(proxy, gameInstance);
    return proxy;
}
    
function setStageProxyText(text1){
    let spriteTxt = "";
    
    if (text1) {
        spriteTxt = text1;
    }
    
    proxyDialogue = spriteTxt;
}

function setStageNAT(centerX, centerY, gameInstance) {
    let NAT = addSprite(["NAT"], NATDialogue, 'NAT', centerX + 40, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(NAT, gameInstance);

    let NATScreen = addSprite("", "", 'NATScreen', centerX, centerY, 0.5, 0, false, gameInstance);

    return NAT;
}
    
function setStageNATText(text1){
    let spriteTxt = "";
    
    if (text1) {
        sprite = text1;
    }
        
    
    NATDialogue = spriteTxt;
}

/**
 * An internal function that is used to initialize platformer sprites.
 * Attaches animations to the sprite, and attaches the toggleClicked() function to an input listener.
 * Attaches platformer sprite movement to the sprite as well.
 * 
 * @param {object} sprite       - The sprite to initialize
 * @param {object} gameInstance - A copy of the game variable
 */
function initPlatformerSprite(sprite, gameInstance) {
    sprite.animations.add('idle', ["idle"], 1, true);
    sprite.animations.add('run', ["walk_1", "walk_2"], 5, true);

    gameInstance.time.events.loop(Phaser.Timer.SECOND * 1, toggleCameraFocus, {
        sprite: sprite,
        isPlatformerSprite: true,
        gameInstance: gameInstance
    });
}

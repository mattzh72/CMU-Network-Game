//ACL Stage Sprites
let ACLSprite;
let ACLScreen;

//Stateful Firewall Stage Sprites
let statefulFWSprite;
let statefulFWSprite2;
let connectionTable;

//IDS/IPS Sprite
let IDS;

let FOCUSED_SPRITE = null;

function setStageACL(centerX, centerY, gameInstance){
    ACLScreen = addSprite(["Access Control List"], ["I am an ACL."], 'ACLScreen', centerX, centerY, 0.25, 0, true, gameInstance).instance;
    
    ACLSprite = addSprite(["Stateless Firewall"], ["I am a stateless firewall."], 'ACLSprite', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;
    initPlatformerSprite(ACLSprite, gameInstance);
}

function setStageStatefulFW(centerX, centerY, gameInstance){
    ACLScreen = addSprite(["Access Control List"], ["I am an ACL."], 'ACLScreen', centerX + 20, centerY, 0.25, 0, true, gameInstance).instance;

    connectionTable = addSprite(["Connection Table"], ["I am an connnection table."], 'ConnectionTable', centerX - 170, centerY + 40, 0.25, 0, true, gameInstance).instance;
    
    statefulFWSprite = addSprite(["Stateful Firewall"], ["I am Stateful."], 'StatefulFW', centerX, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance;    
    initPlatformerSprite(statefulFWSprite, gameInstance);

    statefulFWSprite2 = addSprite(["Stateful Firewall"], ["I am Stateful."], 'StatefulFW', centerX - 100, centerY, PLATFORMER_SCALE, 200, true, gameInstance).instance; 
    initPlatformerSprite(statefulFWSprite2, gameInstance);
}

function setStageIDS(centerX, centerY, gameInstance){
    IDS = addSprite(["Intrusion Detection"], ["I am an IDS."], 'robot', centerX + 20, centerY, 0.2, 0, true, gameInstance).instance;
    IDS.events.onInputDown.add(toggleClicked, {sprite: IDS}); 
}

/*
    Helper functions. These functions serve to be used by the main "setStage" methods above.
*/
function toggleClicked(){
    if (dialogueOpen == "moving"){
        FOCUSED_SPRITE = this.sprite;
    }
}

function initPlatformerSprite(sprite, gameInstance){
    sprite.animations.add('idle',["idle"],1,true);  
    sprite.animations.add('run',["walk_1", "walk_2"],5,true);
    
    sprite.events.onInputDown.add(toggleClicked, {sprite: sprite}); 
    
    gameInstance.time.events.loop(Phaser.Timer.SECOND * 1, movePlatformerSprite, {sprite: sprite, defaultFollow:[500, 500], gameInstance: gameInstance});   
}




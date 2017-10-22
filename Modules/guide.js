let guideSprite;

/**
 * Initializes the guide sprite into the world.
 * 
 * @param {String} text         - The dialogue array for the guide sprite.
 * @param {object} gameInstance - Holds a copy of the game variable
 */
function initGuideSprite(text, gameInstance){   
    let guideSpriteData = addSprite(["Game Guide"], text, 'helperSprite', 0, 0, 0.4, 0, true, gameInstance);
    guideSprite = guideSpriteData.instance;
    addHelperSpriteTooltip(guideSpriteData.instance, gameInstance);
    guideSprite.events.onInputDown.add(openGameMenu, {
//        nf: this,
//        accordion: "#router-accordion",
//        button: "#router-button-add",
//        div: "#router-dialog",
//        displayInformation: tableInfo,
//        tabs: "#router-tabs",
        gameInstance: gameInstance,
    });
    
    return guideSpriteData;
}

/**
 * Updates the sprite position relative to the mouse pointer position.
 * 
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function updateHelperSpritePos(gameInstance){
    let distance = gameInstance.physics.arcade.distanceToPointer(guideSprite);
    
    //If the sprite is sufficiently close enough (within a 100 pixels), set velocity of sprite body to 0
    if (distance > 100){
        gameInstance.physics.arcade.moveToPointer(guideSprite, 100, gameInstance.input.activePointer, 1000);
    }
    else{
        guideSprite.body.velocity.setTo(0, 0);
    }
}

function addHelperSpriteTooltip(sprite, gameInstance){
    let style = {
        font: "12px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 180,
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: "center",
    };
    let text = gameInstance.add.text(0, 0, "Hold SHIFT and click for game menu.", style);
    text.setTextBounds(0, 0, 200, 50);

    this.tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
    });
}
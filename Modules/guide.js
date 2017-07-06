let guideSprite;

/**
 * Initializes the guide sprite into the world.
 * 
 * @param {String} text         - The dialogue array for the guide sprite.
 * @param {object} gameInstance - Holds a copy of the game variable
 */
function initGuideSprite(text, gameInstance){    
    guideSprite = addSprite(["Game Guide"], text, 'helperSprite', 0, 0, 0.5, 0, true, gameInstance).instance;
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
let guideSprite;

function initGuideSprite(text, gameInstance){    
    guideSprite = addSprite(["Game Guide"], text, 'helperSprite', 0, 0, 0.5, 0, true, gameInstance).instance;
}

function updateHelperSpritePos(gameInstance){
    let distance = gameInstance.physics.arcade.distanceToPointer(guideSprite);
    
    if (distance > 100){
        gameInstance.physics.arcade.moveToPointer(guideSprite, 100, gameInstance.input.activePointer, 1000);
    }
    else{
        guideSprite.body.velocity.setTo(0, 0);
    }
}
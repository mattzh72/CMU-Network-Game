PLATFORMER_SCALE = 0.4;
PLATFORMER_SPEED = 60;

function movePlatformerSprite(){ 
    let sprite = this.sprite;
    let movement = getRandomInt(0, 3);
    
    if (dialogueOpen == "false"){
        this.gameInstance.camera.unfollow(FOCUSED_SPRITE);
        if (movement == 0)
        {
            sprite.animations.play('run');
            sprite.scale.setTo(PLATFORMER_SCALE,PLATFORMER_SCALE);
            sprite.body.velocity.x = PLATFORMER_SPEED;
        }
        else if (movement == 1)
        {
            sprite.animations.play('run');
            sprite.scale.setTo(-PLATFORMER_SCALE,PLATFORMER_SCALE);
            sprite.body.velocity.x = -PLATFORMER_SPEED;
        }
        else 
        {
            sprite.animations.play('idle');
            sprite.body.velocity.x = 0;
        }
    }
    else if (dialogueOpen == "true"){
        this.gameInstance.camera.follow(FOCUSED_SPRITE, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        sprite.animations.play('idle');
        sprite.body.velocity.x = 0;        
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addSprite(title, txt, image, posX, posY, scale, gravity, inputBool, gameInstance){    
    let sprite = gameInstance.add.sprite(posX, posY, image);
    let spriteData = {instance: sprite, img: image, name: title, dialogue: txt};
    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(scale, scale);
    gameInstance.physics.arcade.enable(sprite);
    sprite.body.gravity.y = gravity;
    sprite.body.collideWorldBounds = true;
    sprite.inputEnabled = inputBool;
    sprite.input.priorityID = 1;
    sprite.input.useHandCursor = true;
    sprite.events.onInputDown.add(openDialogue, {spriteData: spriteData, gameInstance: gameInstance}); 
    
    return spriteData;
}


//function addSprite(config, gameInstance){    
//    let sprite = gameInstance.add.sprite(config.posX, config.posY, config.image);
//    let spriteData = {instance: sprite, img: config.image, name: config.title, dialogue: config.txt};
//    
//    sprite.scale.setTo(config.scale, config.scale);
//    gameInstance.physics.arcade.enable(sprite);
//    sprite.body.gravity.y = config.gravity;
//    sprite.body.collideWorldBounds = true;
//    sprite.inputEnabled = config.inputBool;
//    sprite.input.priorityID = 1;
//    sprite.input.useHandCursor = true;
//    sprite.events.onInputDown.add(openDialogue, {spriteData: spriteData, gameInstance: gameInstance}); 
//    
//    return spriteData;
//}
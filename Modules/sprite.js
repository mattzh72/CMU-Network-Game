//Global constants
let PLATFORMER_SCALE = 0.4;
let PLATFORMER_SPEED = 60;

//The sprite the camera is focused on
let FOCUSED_SPRITE = null;


/**
 * Switches the camera to follow the most recently clicked sprite
 */
function toggleCameraFocus() {
    if (dialogueOpen == "false") {
        this.gameInstance.camera.unfollow(FOCUSED_SPRITE);
        if (this.isPlatformerSprite === true) {
            movePlatformerSprite(this.sprite);
        } else {
            moveFlyingSprite(this.sprite, this.img, this.altImg, this.packetStreamObj.packetArr, this.startX, this.startY, this.gameInstance);
        }
    } else if (dialogueOpen == "true") {
        this.gameInstance.camera.follow(FOCUSED_SPRITE, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        if (this.isPlatformerSprite === true)
            this.sprite.animations.play('idle');
    }
}

/**
 * This is attached to a custom game loop in security.js for the platformer security sprites (sprites with gravity)
 * Uses getRandomInt(min, max) to choose whether to walk around or stay idle.
 * 
 * Checks status of dialogue box. If open, stops the sprite movement. If closed, resume sprite movement.
 * Additionally sets camera properties. If dialogue box is open, camera follows the selected sprite. Else, the camera is independent.
 */
function movePlatformerSprite(sprite) {
    let movement = getRandomInt(0, 3);
    if (movement == 0) {
        sprite.animations.play('run');
        sprite.scale.setTo(PLATFORMER_SCALE, PLATFORMER_SCALE);
        sprite.body.velocity.x = PLATFORMER_SPEED;
    } else if (movement == 1) {
        sprite.animations.play('run');
        sprite.scale.setTo(-PLATFORMER_SCALE, PLATFORMER_SCALE);
        sprite.body.velocity.x = -PLATFORMER_SPEED;
    } else {
        sprite.animations.play('idle');
        sprite.body.velocity.x = 0;
    }
}


/**
 * An internal function that generates a random integer between min and max inclusive.
 * @param   {number} min - The minimum in the range 
 * @param   {number} max - The maximum in the range
 *                       
 * @returns {number} A random integer within min and max inclusive
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Adds a sprite with the given parameters to the game world.
 * 
 * @param   {String} title        The title of the sprite to be used in the dialogue box
 * @param   {String} txt          The dialogue of the sprite that is displayed in the dialogue box
 * @param   {String} image        The image key of the sprite cached in the game state
 * @param   {number} posX         The x position of where to initialize the sprite
 * @param   {number} posY         The y position of where to initialize the sprite
 * @param   {number} scale        The scale at which to initialize the sprite
 * @param   {number}   gravity    The value of gravity on the sprite body
 * @param   {boolean} inputBool   Whether or not the sprite will accept input
 * @param   {object}   gameInstance Holds a copy of the game variable
 *                                  
 * @returns {object} A custom object containing an instance of the sprite, the cached image key, the title of the sprite, and the dialogue of the sprite.
 */
function addSprite(title, txt, image, posX, posY, scale, gravity, inputBool, gameInstance) {
    let sprite = gameInstance.add.sprite(posX, posY, image);
    let spriteData = {
        instance: sprite,
        img: image,
        name: title,
        dialogue: txt
    };

    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(scale, scale);
    gameInstance.physics.arcade.enable(sprite);
    sprite.body.gravity.y = gravity;
    sprite.body.collideWorldBounds = true;

    if (inputBool === true && txt.length > 0) {
        
        if (spriteData.dialogue[spriteData.dialogue.length - 1] != "Press ESC to close."){
            spriteData.dialogue.push("Press ESC to close.");
        }
        
        sprite.inputEnabled = inputBool;
        sprite.input.priorityID = 1;
        sprite.input.useHandCursor = true;
        sprite.events.onInputDown.add(openDialogue, {
            spriteData: spriteData,
            gameInstance: gameInstance
        });
        
        sprite.events.onInputDown.add(toggleClicked, {
            sprite: sprite
        });

        setGrowOnHover(sprite, scale, gameInstance);
    }

    return spriteData;
}

/**
 * Tweens the scale of a sprite upwads to a programatically defined scale.
 */
function tweenScale() {
    if (this.sprite.scale.x < 0 && this.xScale > 0) {
        this.xScale = this.xScale * -1;
    }

    this.gameInstance.add.tween(this.sprite.scale).to({
        x: this.xScale,
        y: this.yScale
    }, 200, Phaser.Easing.Linear.In, true);
}

function setGrowOnHover(sprite, scale, gameInstance) {
    sprite.events.onInputOver.add(tweenScale, {
        sprite: sprite,
        xScale: scale + 0.05,
        yScale: scale + 0.05,
        gameInstance: gameInstance,
    });
    sprite.events.onInputOut.add(tweenScale, {
        sprite: sprite,
        xScale: scale,
        yScale: scale,
        gameInstance: gameInstance,
    });
}

function addRoomDecor(x, y, scale, imgKey, gameInstance, popupObj, dialogue) {
    let decor = gameInstance.add.sprite(x, y, imgKey);
    decor.scale.setTo(scale, scale);
    decor.anchor.setTo(0.5, 0.5);
    
    if (popupObj && dialogue.content.length > 0) {
        decor.inputEnabled = true;
        decor.input.priorityID = 1;
        decor.input.useHandCursor = true;
        setGrowOnHover(decor, scale, gameInstance);

        dialogue.content.push("Press ESC to close.");
        let spriteData = {
            instance: decor,
            img: imgKey,
            name: dialogue.title,
            dialogue: dialogue.content,
        };
        decor.events.onInputDown.add(openDialogue, {
            spriteData: spriteData,
            gameInstance: gameInstance
        });

        let popup = gameInstance.add.sprite(decor.x, decor.y, popupObj.key);
        popup.inputEnabled = true;
        popup.input.enableDrag();

        let anchor = 0.5;
        let fullScale = 0;

        if (popupObj.anchor) {
            anchor = popupObj.anchor;
        }

        if (popupObj.scale) {
            fullScale = popupObj.scale;
        }

        popup.anchor.setTo(anchor, anchor);
        popup.scale.setTo(0, 0);
        decor.events.onInputDown.add(popupImage, {
            img: popup,
            gameInstance: gameInstance,
            fullScale: fullScale,
        });
        
        decor.events.onInputDown.add(toggleClicked, {
            sprite: decor
        });
    }

    return decor;
}

function popupImage() {
    let img = this.img;
    let gameInstance = this.gameInstance;

    let fullScale = this.fullScale;
    if (!fullScale) {
        fullScale = 1;
    }

    gameInstance.add.tween(img.scale).to({
        x: fullScale,
        y: fullScale
    }, 1000, Phaser.Easing.Elastic.Out, true);

    img.bringToTop();

    let popupControls = {
        close: gameInstance.input.keyboard.addKey(Phaser.Keyboard.ESC),
    };

    //C is used to close dialogue box
    popupControls.close.onDown.add(function () {
        img.scale.x = 0;
        img.scale.y = 0;
    });
}

/**
 * An internal function that is attached to the sprites in the rooms. 
 * Once a sprite is clicked, this function is called, and changes FOCUSED_SPRITE, the sprite the camera is following, to the recently clicked sprite. 
 */
function toggleClicked() {
    if (dialogueOpen == "moving") {
        FOCUSED_SPRITE = this.sprite;
    }
}

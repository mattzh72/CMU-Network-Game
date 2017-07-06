//Global constants
let PLATFORMER_SCALE = 0.4;
let PLATFORMER_SPEED = 60;

/**
 * This is attached to a custom game loop in security.js for the security sprites
 * Uses getRandomInt(min, max) to choose whether to walk around or stay idle.
 * 
 * Checks status of dialogue box. If open, stops the sprite movement. If closed, resume sprite movement.
 * Additionally sets camera properties. If dialogue box is open, camera follows the selected sprite. Else, the camera is independent.
 */
function movePlatformerSprite() {
    let sprite = this.sprite;
    let movement = getRandomInt(0, 3);

    if (dialogueOpen == "false") {
        this.gameInstance.camera.unfollow(FOCUSED_SPRITE);
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
    } else if (dialogueOpen == "true") {
        this.gameInstance.camera.follow(FOCUSED_SPRITE, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
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
    sprite.inputEnabled = inputBool;
    sprite.input.priorityID = 1;
    sprite.input.useHandCursor = true;
    sprite.events.onInputDown.add(openDialogue, {
        spriteData: spriteData,
        gameInstance: gameInstance
    });

    return spriteData;
}

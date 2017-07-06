let controls;

/**
 * Initalizes the control object
 * 
 * @param {object} gameInstance - A copy of the game variable
 */
function addControls(gameInstance){
    controls = {
        right: gameInstance.input.keyboard.addKey(Phaser.Keyboard.D),
        left: gameInstance.input.keyboard.addKey(Phaser.Keyboard.A),
        up: gameInstance.input.keyboard.addKey(Phaser.Keyboard.W),
        down: gameInstance.input.keyboard.addKey(Phaser.Keyboard.S),          
    };
}

/**
 * Adds functionality to the controls defined earlier.
 * If up is pressed, move the camera up.
 * If down is pressed, move the camera down.
 * If left is pressed, move the camera left.
 * If right is pressed, move the camera right.
 * 
 * @param {object} gameInstance - A copy of the game variable
 */
function addCameraControls(gameInstance){
    if (controls.up.isDown)
    {
        gameInstance.camera.y -= 4;
    }
    else if (controls.down.isDown)
    {
        gameInstance.camera.y += 4;
    }

    if (controls.left.isDown)
    {
        gameInstance.camera.x -= 4;
    }
    else if (controls.right.isDown)
    {
        gameInstance.camera.x += 4;
    }    
}
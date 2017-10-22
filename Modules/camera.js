let controls;
let CAMERA_SPEED = 5;

/**
 * Initalizes the control object
 * 
 * @param {object} gameInstance - A copy of the game variable
 */
function addControls(gameInstance) {
    controls = {
        right: gameInstance.input.keyboard.addKey(Phaser.Keyboard.D),
        left: gameInstance.input.keyboard.addKey(Phaser.Keyboard.A),
        up: gameInstance.input.keyboard.addKey(Phaser.Keyboard.W),
        down: gameInstance.input.keyboard.addKey(Phaser.Keyboard.S),
        shift: gameInstance.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
    };
}

function removeControls(gameInstance) {
    gameInstance.input.keyboard.removeKey(Phaser.Keyboard.D);
    gameInstance.input.keyboard.removeKey(Phaser.Keyboard.A);
    gameInstance.input.keyboard.removeKey(Phaser.Keyboard.W);
    gameInstance.input.keyboard.removeKey(Phaser.Keyboard.S);
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
function pollCameraControls(gameInstance) {
    if (gameInstance.input.activePointer.isDown) {
        gameInstance.physics.arcade.isPaused = false; //when player clicks on screen after resizing, game continues
    }

    if (dialogueOpen == "false"){
        if (controls.up.isDown) {
            gameInstance.camera.y -= CAMERA_SPEED;
        } else if (controls.down.isDown) {
            gameInstance.camera.y += CAMERA_SPEED;
        }

        if (controls.left.isDown) {
            gameInstance.camera.x -= CAMERA_SPEED;
        } else if (controls.right.isDown) {
            gameInstance.camera.x += CAMERA_SPEED;
        }
    }
}

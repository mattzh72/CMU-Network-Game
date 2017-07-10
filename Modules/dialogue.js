let dialogueBox;
let blurb;
let title;
let style;
let icon;
let arrows;

let textArray;
let textIndex = 0;

const PADDING_BOTTOM = 20;
let tween = null;
let dialogueOpen = "false";

/**
 * Initializes the dialogue into the game. 
 * Insert this function into the create function of your level.
 * 
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function initDialogue(gameInstance) {
    //Add the dialogue box in the center of the user's horizontal viewpoint and near the bottom of the screen.
    dialogueBox = gameInstance.add.sprite(gameInstance.camera.x + window.innerWidth / 2, gameInstance.camera.y + window.innerHeight, 'dialogue');
    dialogueBox.anchor.setTo(0.5, 0.5);
    gameInstance.physics.arcade.enable(dialogueBox);
    dialogueBox.inputEnabled = true;
    dialogueBox.input.priorityID = 1;
    dialogueBox.input.useHandCursor = true;
    dialogueBox.events.onInputDown.add(nextTxt, gameInstance);
    

    //Initialize the icon, textArray, blurb, and title to blank values.
    textArray = [];
    initIcon('', gameInstance);
    blurb = initText("", 0.5, 500, gameInstance);
    title = initText("", 0.5, 200, gameInstance);

    //Scale all down to 0 to make it not visible to the player.
    blurb.scale.setTo(0, 0);
    title.scale.setTo(0, 0);
    icon.scale.setTo(0, 0);

    //Intialize the controls and add functionality.
    initDialogueControls(gameInstance);
}

/**
 * This sets the positions of all the dialogue pieces to their correct positions relative to the browser window. 
 * Insert this in the update loop of your level.
 * 
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function updateDialoguePos(gameInstance) {
    //Define two variables that the positions of the dialogue elements will be relative to.
    let X_POS_OFFSET = gameInstance.camera.x + window.innerWidth / 2;
    let Y_POS_OFFSET = gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;

    dialogueBox.x = X_POS_OFFSET;

    //If the dialogue box is open, then keep it near bottom of the page.
    //If the dialogue box is closed, keep it out of the player's sight.
    if (dialogueOpen == "true") {
        dialogueBox.y = Y_POS_OFFSET - dialogueBox.height / 2;
    } else if (dialogueOpen == "false") {
        dialogueBox.y = Y_POS_OFFSET + dialogueBox.height;
    }

    blurb.x = X_POS_OFFSET + icon.width;
    blurb.y = Y_POS_OFFSET - dialogueBox.height / 2.5;

    title.x = X_POS_OFFSET - 266;
    title.y = Y_POS_OFFSET - 268 + PADDING_BOTTOM;

    icon.x = X_POS_OFFSET - 270;
    icon.y = Y_POS_OFFSET - dialogueBox.height / 2.5;
}

/**
 * An internal function used to initalize the blurb and title. 
 * This function adds text to the game world 
 * 
 * @param   {object}   text - The String to be initialized
 * @param   {number} anchor - Where to anchor the text
 * @param   {number} wordWrapVal - The length at which the text should be wrapped
 * @param   {object} gameInstance - Holds a copy of the game variable
 * @returns {object} - Returns the in-game text object
 */
function initText(text, anchor, wordWrapVal, gameInstance) {
    //Intialize a style object.
    style = {
        font: "18px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: wordWrapVal
    };
    text = gameInstance.add.text(0, 0, text[0], style);
    text.anchor.setTo(anchor, anchor);

    return text;
}

/**
 * An internal function used to initialize the icon.
 * @param {String} image - The key of the image cached in the game state.
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function initIcon(image, gameInstance) {
    icon = gameInstance.add.image(0, 0, image);
    icon.anchor.setTo(0.5, 0.5);
}

/**
 * An internal function used to set and add functionality to dialogue controls.
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function initDialogueControls(gameInstance) {
    let dialogueControls = {
        close: gameInstance.input.keyboard.addKey(Phaser.Keyboard.ESC),
    };

    //C is used to close dialogue box
    dialogueControls.close.onDown.add(closeDialogue, {
        gameInstance: gameInstance
    })
}

/**
 * An internal function that increments the index count. 
 * The count correspondes to the index of textArray.
 * 
 * Sets the blurb to the next text in textArray, if available.
 */
function nextTxt() {
    if (textIndex + 1 < textArray.length) {
        textIndex += 1;
        blurb.setText(textArray[textIndex]);
    }
}

/**
 * This function is used by the "sprite.js" file. It is attached to a listener that detects input on a sprite. Essentially, this function is called only when a sprite is clicked on.
 * 
 * The function opens the dialogue by moving the dialogue box upwards and displaying the text. 
 * The text is displayed with a time delay for aesthetic purposes.
 */
function openDialogue() {
    textIndex = 0;
    
    if (dialogueOpen === "false") {
        dialogueOpen = "moving";

        //Load the text and the icon while the dialogue is moving. 
        //This disables the user's ability to change the content of the dialogue when it is still open.
        let Y_POS_OFFSET = this.gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;
        let spriteData = this.spriteData;

        //Load the sprite's image
        icon.loadTexture(spriteData.img);

        textArray = spriteData.dialogue;

        //Set blurb to the first text String in the text array.
        blurb.setText(spriteData.dialogue[0]);
        title.setText(spriteData.name);

        //Moves the dialogue box up in 1000ms
        this.gameInstance.physics.arcade.moveToXY(dialogueBox, dialogueBox.x, Y_POS_OFFSET - dialogueBox.height / 2, 20, 1000);
        //Set a timeout that stops the dialogue box after 1000ms
        setTimeout(function () {
            dialogueBox.body.velocity.y = 0;
        }, 1000);

        //wait for tween to finish
        setTimeout(function () {
            dialogueOpen = "true";
        }, 1500);

        //Wait until the dialogue box is fully up and then display the text and icon
        setTimeout(openObj, 1250, title, this.gameInstance);
        setTimeout(openObj, 1250, icon, this.gameInstance);
        setTimeout(openObj, 1250, blurb, this.gameInstance);

        //Bring all the elements to the top layer of the game
        //This way no sprites will overlap over the dialogue elements
        this.gameInstance.world.bringToTop(dialogueBox);
        this.gameInstance.world.bringToTop(title);
        this.gameInstance.world.bringToTop(blurb);
        this.gameInstance.world.bringToTop(icon);
        
    }
    
}

/**
 * This function closes the dialogue by moving the dialogue box downwards, and scaling the text and icon to 0.
 * It is attached to an event that is triggered by a dialoge control (Pressing the C key).
 */
function closeDialogue() {
    let Y_POS_OFFSET = this.gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;

    if (dialogueOpen === "true") {
        dialogueOpen = "moving";
        //Moves the dialogue box down.
        this.gameInstance.physics.arcade.moveToXY(dialogueBox, dialogueBox.x, Y_POS_OFFSET + dialogueBox.height, 200, 1000);
        setTimeout(function () {
            dialogueBox.body.velocity.y = 0;
            dialogueOpen = "false";
        }, 1000);
        
        //Close the icon and text immediately
        closeObj(icon, this.gameInstance);
        closeObj(blurb, this.gameInstance);
        closeObj(title, this.gameInstance);
    }
}

/**
 * This opens up the object by scaling it from 0 to an appropriate size.
 * 
 * @param {object} object - The object to scale up.
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function openObj(object, gameInstance) {
    //If the object is already scaled up, don't try scaling it up again
    if (object.scale.x != 0)
        return;

    let scale = 1;

    //If the object image size is too big, scale it down appropriately for an icon
    if (typeof object.key == "string" && gameInstance.cache.getImage(object.key).width > 90){
        scale = 90 / gameInstance.cache.getImage(object.key).width;
    }
    
    tween = gameInstance.add.tween(object.scale).to({
        x: scale,
        y: scale
    }, 100, Phaser.Easing.Elastic.Out, true);

}

/**
 * Closes the object by scaling it to 0.
 * 
 * @param {object} object       - The object to scale down.
 * @param {object} gameInstance - Holds a copy of the game variable.
 */
function closeObj(object, gameInstance) {
    //If the object is already scaled down, don't try scaling it down again
    if (object.scale.x === 0)
        return;

    tween = gameInstance.add.tween(object.scale).to({
        x: 0,
        y: 0
    }, 50, Phaser.Easing.Linear.In, true);
}

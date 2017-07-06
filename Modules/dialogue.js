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

function initDialogue(gameInstance){    
    dialogueBox = gameInstance.add.sprite(gameInstance.camera.x + window.innerWidth/2, gameInstance.camera.y + window.innerHeight, 'dialogue');
    dialogueBox.anchor.setTo(0.5, 0.5);
    gameInstance.physics.arcade.enable(dialogueBox);

    initIcon('', gameInstance); 
    
    textArray = [];
    
    blurb = initText("", 0.5, 0.5, 500, gameInstance);
    title = initText("", 0.5, 0.5, 200, gameInstance);
    
    blurb.scale.setTo(0, 0);
    title.scale.setTo(0, 0);
    icon.scale.setTo(0, 0);
    
    initDialogueControls(gameInstance);
}

function updateDialoguePos(gameInstance){
    let X_POS_OFFSET = gameInstance.camera.x + window.innerWidth/2;
    let Y_POS_OFFSET = gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;
    
    dialogueBox.x = X_POS_OFFSET;
    
    if (dialogueOpen == "true"){
        dialogueBox.y = Y_POS_OFFSET - dialogueBox.height/2;
    }
    else if (dialogueOpen == "false") {
        dialogueBox.y = Y_POS_OFFSET + dialogueBox.height;
    }
    
    blurb.x = X_POS_OFFSET + icon.width;
    blurb.y = Y_POS_OFFSET  - dialogueBox.height/2.5;
    
    title.x = X_POS_OFFSET - 266;
    title.y = Y_POS_OFFSET - 268 + PADDING_BOTTOM;
    
    icon.x = X_POS_OFFSET - 270;
    icon.y = Y_POS_OFFSET - dialogueBox.height/2.5;
}

function initText(text, anchorX, anchorY, wordWrapVal, gameInstance){
    style = {font: "18px Source Sans Pro", fill: 'white', wordWrap: true, wordWrapWidth: wordWrapVal};
    text = gameInstance.add.text(0, 0, text[0], style);
    text.anchor.setTo(anchorX, anchorY);
    
    return text;
}

function initIcon(image, gameInstance){
    icon = gameInstance.add.image(0, 0, image);
    icon.anchor.setTo(0.5, 0.5);
}

function initDialogueControls(gameInstance){
    let dialogueControls = {
        right: gameInstance.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        left: gameInstance.input.keyboard.addKey(Phaser.Keyboard.LEFT),   
        close: gameInstance.input.keyboard.addKey(Phaser.Keyboard.C),
    };
    
    dialogueControls.right.onDown.add(nextTxt, gameInstance); 
    dialogueControls.left.onDown.add(backTxt, gameInstance); 
    dialogueControls.close.onDown.add(closeDialogue, {gameInstance: gameInstance})
}

function nextTxt() {
    if (textIndex + 1< textArray.length){
        textIndex += 1;
        blurb.setText(textArray[textIndex]);
    }
}

function backTxt() {
    if (textIndex - 1 >= 0){
        textIndex -= 1;
        blurb.setText(textArray[textIndex]);
    }
}

function openDialogue(){
    if (dialogueOpen === "false"){
        dialogueOpen = "moving";
        
        //Load the text and the icon while the dialogue is moving. 
        //This disables the user's ability to change the content of the dialogue when it is still open.
        let Y_POS_OFFSET = this.gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;
        let spriteData = this.spriteData;
    
        icon.loadTexture(spriteData.img);
    
        textArray = spriteData.dialogue;
    
        blurb.setText(spriteData.dialogue[0]);
        title.setText(spriteData.name);

        //Moves the dialogue box up.
        this.gameInstance.physics.arcade.moveToXY(dialogueBox, dialogueBox.x, Y_POS_OFFSET - dialogueBox.height/2, 20, 1000); 
        setTimeout(function(){dialogueBox.body.velocity.y = 0;}, 1000);
        
        //wait for tween to finish
        setTimeout(function(){dialogueOpen = "true";}, 1500);

        setTimeout(openObj, 1250, title, this.gameInstance);
        setTimeout(openObj, 1250, icon, this.gameInstance);
        setTimeout(openObj, 1250, blurb, this.gameInstance);
    }
}

function closeDialogue(){    
    let Y_POS_OFFSET = this.gameInstance.camera.y + window.innerHeight - PADDING_BOTTOM;
    
    if (dialogueOpen === "true"){
        dialogueOpen = "moving";
        //Moves the dialogue box down.
        this.gameInstance.physics.arcade.moveToXY(dialogueBox, dialogueBox.x, Y_POS_OFFSET + dialogueBox.height, 200, 1000);
        setTimeout(function(){dialogueBox.body.velocity.y = 0; dialogueOpen = "false";}, 1000);
        closeObj(icon, this.gameInstance);
        closeObj(blurb, this.gameInstance);
        closeObj(title, this.gameInstance);
    }
}

function openObj(object, gameInstance){
    if (object.scale.x != 0)
        return;

    let scale = 1;
    if (typeof object.key == "string")
        scale = 100/gameInstance.cache.getImage(object.key).width; 
    
    console.log(object.height);
        
    tween = gameInstance.add.tween(object.scale).to( { x: scale, y: scale }, 500, Phaser.Easing.Elastic.Out, true);

}



function closeObj(object, gameInstance){
    if (object.scale.x === 0)
        return;
    
    tween = gameInstance.add.tween(object.scale).to( { x: 0, y: 0 }, 50, Phaser.Easing.Elastic.In, true);
}
    
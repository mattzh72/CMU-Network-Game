let player;
let controls;
let PLAYER_SPEED = 500;

function initPlayer(gameInstance){
    player = gameInstance.add.sprite(500, 500, 'player');

    player.anchor.setTo(0.5, 0.5);
    
    player.animations.add('idle',[8],1,true); 
    player.animations.add('jump',[14],1,true);
    player.animations.add('run',[0,1,2,3,4,5,6],5,true);
    gameInstance.physics.arcade.enable(player);
    player.body.gravity.y = 1400;
    player.body.collideWorldBounds = true;
    
    addControls(gameInstance);
}

function addControls(gameInstance){
    controls = {
        right: gameInstance.input.keyboard.addKey(Phaser.Keyboard.D),
        left: gameInstance.input.keyboard.addKey(Phaser.Keyboard.A),
        up: gameInstance.input.keyboard.addKey(Phaser.Keyboard.W),
        down: gameInstance.input.keyboard.addKey(Phaser.Keyboard.S),          
    };
}

function addPlayerControls(speed) {
    player.body.velocity.x = 0;
        
    if (controls.down.isDown){
        player.body.velocity.y = 600;
    }
    
    if (controls.right.isDown){
        player.animations.play('run');
        player.scale.setTo(1,1);
        player.body.velocity.x += speed;
    }
    
    if (controls.left.isDown){
        player.animations.play('run');
        player.scale.setTo(-1,1);
        player.body.velocity.x -= speed;
    }
    
    if (controls.up.isDown){
       player.body.velocity.y = -600;
        player.animations.play('jump');
    }
    
    if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
        player.animations.play('idle');
    }
}

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
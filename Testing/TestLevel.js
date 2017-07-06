Game.TestLevel = function(game){};

Game.TestLevel.prototype = {
    
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
                
        initMap('testMap', ['tileset1', 'tileset2'], this);
        initPlayer(this);
                
        initPacketStream(500, 500, 100, 800, true, this); 

        let IDS;
        IDS = addSprite(["Intrusion Detection"], ["I act as an IDS, or intrusion detection system, a device or program that observes a network for any malicious activities or policy violations, during which I produce reports about the network security.  Intrusion detection systems are passive systems.", "Press C to Close"], 'robot', 500, 500, 0.3, 0, true, this);
        
        initDialogue(this);
                
    },
    
    update: function(){   
        addCollision(player, layers, this);
        this.camera.follow(player);
        
        addPlayerControls(PLAYER_SPEED);
        updateDialoguePos(this);
        updatePacketPos(this);

    }, 
}
    
    



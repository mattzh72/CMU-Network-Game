Game.Stage_2 = function(game){
    this.ACL;
    this.StatefulFW;
    this.Proxy;
    this.IPS;
    this.NAT;
};

Game.Stage_2.prototype = {
        
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5', 'tileset6'], this);
        initDialogue(this);
        
        //ACL  
        initPacketStream(610, 260, 1000, 260, STREAM_DENSITY_FACTOR, false, this);         
        this.ACL = setStageACL(this.world.centerX, 350, this);
        
        //STATEFUL FW 
        initPacketStream(610, 810, 1000, 810, STREAM_DENSITY_FACTOR, false, this);         
        this.StatefulFW = setStageStatefulFW(this.world.centerX, 900, this);
        
        //PROXY 
        initPacketStream(610, 1525, 800, 1510, STREAM_DENSITY_FACTOR, false, this);         
        initPacketStream(800, 1460, 1000, 1455, STREAM_DENSITY_FACTOR, false, this);  
        this.Proxy = setStageProxy(this.world.centerX, 1345, this);
        
        //IPS
        initPacketStream(610, 2065, 1000, 2065, STREAM_DENSITY_FACTOR, false, this);      
        this.IPS = setStageIPS(this.world.centerX, 2000, this);
        
        //NAT
        initPacketStream(610, 2440, 1000, 2440, STREAM_DENSITY_FACTOR, false, this);      
        this.NAT = setStageNAT(this.world.centerX, 2530, this);
        
        
        let guideTextArr = [
            "I am the Game Guide!",
            "Press C to Close",
        ];
        
        initGuideSprite(guideTextArr, this);
    },
    
    update: function(){ 
        //update packet stream positions
        updatePacketPositions(this);

        addCollision(this. ACL, this);
        addCollision(this.StatefulFW, this);
        addCollision(this.IPS, this);
        addCollision(this.NAT, this);

        updateHelperSpritePos(this);

        updateDialoguePos(this);
        
        pollCameraControls(this);
        
    }, 
}
    
    



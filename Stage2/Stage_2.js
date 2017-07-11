Game.Stage_2 = function(game){
    this.packetStream1 = {};
    this.packetStream2 = {};
    this.packetStream3 = {};
    this.packetStream4 = {}; 
    this.packetStream5 = {};
};

Game.Stage_2.prototype = {
        
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5'], this);
        initDialogue(this);
        
        //ACL  
        this.packetStream1 = initPacketStream(610, 260, 1000, 260, false, this);         
        setStageACL(this.world.centerX, 350, this);
        
        //STATEFUL FW 
        this.packetStream2 = initPacketStream(610, 810, 1000, 810, false, this);         
        setStageStatefulFW(this.world.centerX, 900, this);
        
        //PROXY 
        this.packetStream3= initPacketStream(610, 1525, 800, 1510, false, this);         
        this.packetStream4 = initPacketStream(800, 1460, 1000, 1455, false, this);  
        setStageProxy(this.world.centerX, 1345, this);
        
        //IDS
        this.packetStream5 = initPacketStream(610, 2065, 1000, 2065, false, this);      
        setStageIDS(this.world.centerX, 2000, this.packetStream5, this);
        
        let guideTextArr = [
            "I am the Game Guide!",
            "Press C to Close",
        ];
        
        initGuideSprite(guideTextArr, this);
    },
    
    update: function(){ 
        //update packet stream positions
        updatePacketPos(this.packetStream1, this);
        updatePacketPos(this.packetStream2, this);
        updatePacketPos(this.packetStream3, this);
        updatePacketPos(this.packetStream4, this);
        updatePacketPos(this.packetStream5, this);



        addCollision(ACLSprite, this);
        addCollision(statefulFWSprite, this);
        addCollision(IDS, this);
        
        updateHelperSpritePos(this);

        updateDialoguePos(this);
        
        pollCameraControls(this);
        
    }, 
}
    
    



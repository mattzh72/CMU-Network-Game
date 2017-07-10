Game.Stage_2 = function(game){
    this.packetStream1 = {};
    this.packetStream2 = {};
    this.packetStream3 = {};
    this.packetStream4 = {}; 
};

Game.Stage_2.prototype = {
        
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2'], this);
        initDialogue(this);
        
        //ACL RROOM TOP LEFT
        this.packetStream1 = initPacketStream(440, 530, 850, 530, false, this);      
        setStageACL(650, 620, this);
        
        //STATEFUL FW TOP RIGHT
        this.packetStream2 = initPacketStream(1020, 530, 1420, 530, false, this);         
        setStageStatefulFW(1300, 620, this);
        
        //IDS BOTTOM RIGHT
        this.packetStream3 = initPacketStream(1020, 1100, 1420, 1100, false, this);         
        setStageIDS(1300, 970, this.packetStream3, this);

        
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

        addCollision(ACLSprite, this);
        addCollision(statefulFWSprite, this);
        addCollision(statefulFWSprite2, this);
        addCollision(IDS, this);
        
        updateHelperSpritePos(this);

        updateDialoguePos(this);
        
        pollCameraControls(this);
        
    }, 
}
    
    



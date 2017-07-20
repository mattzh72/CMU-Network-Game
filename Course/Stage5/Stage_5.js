Game.Stage_5 = function (game) {
    this.guideTextArr = [
            "Insert intro text here.",
    ];
    this.routerSprite1;
    this.routerSprite2;
    
    this.packet1; 
    this.packet2;
    
    this.NAT;
    this.ACL;
    this.proxy;
};

Game.Stage_5.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5', 'tileset6', 'tileset7', 'tileset8', 'tileset9'], this);
        initDialogue(this);
    
        
        //Set up Router Rooms
        this.routerSprite1 = setStageRouter(425, 700, this).routingTableSprite;
        initPacketStream(610, 760, 215, 620, STREAM_DENSITY_FACTOR, true, this);
        initPacketStream(300, 840, 610, 760, STREAM_DENSITY_FACTOR, true, this);
        initPacketStream(610, 630, 300, 840, STREAM_DENSITY_FACTOR, true, this);

        this.routerSprite2 = setStageRouter(425, 1300, this).routingTableSprite;
        initPacketStream(300, 1450, 630, 1250, STREAM_DENSITY_FACTOR, true, this);
        initPacketStream(570, 1450, 640, 1280, STREAM_DENSITY_FACTOR, true, this);
        initPacketStream(640, 1250, 300, 1130, STREAM_DENSITY_FACTOR, true, this);

        
        //Set up ACL
        this.packet1 = addPacket(1300, 820, "Dropped Packet", this).instance;
        this.packet2 = addPacket(1400, 820, "Dropped Packet", this).instance;
        initTwoWayPacketStream(1100, 760, 1300, 800, STREAM_DENSITY_FACTOR, false, this);
        this.ACL = setStageACL(1300,820, this);

        
        //Set up NAT
        initTwoWayPacketStream(1500, 1250, 1725, 1300, STREAM_DENSITY_FACTOR, false, this);
        this.NAT = setStageNAT(1725,1300, this);
        
        //Set up Proxy        
        initTwoWayPacketStream(900, 1585, 1100, 1585, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(1100, 1535, 1300, 1535, 4, false, this);
        this.proxy = setStageProxy(1100, 1420, this);

        //set up guide sprite
        let guideSpriteData = initGuideSprite(this.guideTextArr, this);
//        this.time.events.add(1000, openDialogue, {
//            spriteData: guideSpriteData,
//            gameInstance: this
//        });
    },

    update: function () {
        updateDialoguePos(this);
        pollCameraControls(this);
        
        updatePacketPositions(this);
        
        //Add collisions for sprites
        addCollision(this.routerSprite1, this);
        addCollision(this.routerSprite2, this);
        addCollision(this.ACL, this);   
        addCollision(this.NAT, this); 
        addCollision(this.packet1, this); 
        addCollision(this.packet2, this); 
        
        updateHelperSpritePos(this);

    },
}

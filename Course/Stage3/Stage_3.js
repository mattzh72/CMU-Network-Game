Game.Stage_3 = function (game) {
    this.IPS;
    this.StatefulFW;
    this.ACL;
    this.Proxy;
    
    this.routerSprite1;
    this.routerSprite2;
    this.routerSprite3;
    this.routerSprite4;
};

Game.Stage_3.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5', 'tileset6', 'tileset7', 'tileset8', 'tileset9', 'tileset10' ], this);
        initDialogue(this);

        //Set up Network 1
        this.routerSprite1 = setStageRouter(this.world.centerX - 20, 1000, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 910, this.world.centerX - 125, 835, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 910, this.world.centerX - 125, 835, STREAM_DENSITY_FACTOR, false, this);
        this.IPS = setStageIPS(this.world.centerX - 20, 600, this);
        initTwoWayPacketStream(this.world.centerX - 125, 720, this.world.centerX + 50, 600, STREAM_DENSITY_FACTOR, false, this);


        
        //Set up Network 2
        this.routerSprite2 = setStageRouter(this.world.centerX - 20, 2120, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 2030, this.world.centerX - 125, 1955, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 2030, this.world.centerX - 125, 1955, STREAM_DENSITY_FACTOR, false, this);
        this.StatefulFW = setStageStatefulFW(this.world.centerX - 20, 1700, this);
        initTwoWayPacketStream(this.world.centerX - 125, 1820, this.world.centerX + 50, 1700, STREAM_DENSITY_FACTOR, false, this);
        
        
        //Set up Network 3
        this.routerSprite3 = setStageRouter(this.world.centerX - 20, 3250, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 3180, this.world.centerX - 125, 3105, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 3180, this.world.centerX - 125, 3105, STREAM_DENSITY_FACTOR, false, this);
        this.ACL = setStageACL(this.world.centerX - 20, 2850, this);
        initTwoWayPacketStream(this.world.centerX - 125, 3000, this.world.centerX + 50, 2850, STREAM_DENSITY_FACTOR, false, this);
        
        
        //Set up Network 4
        this.routerSprite4 = setStageRouter(this.world.centerX - 20, 4400, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 4340, this.world.centerX - 125, 4265, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 4340, this.world.centerX - 125, 4265, STREAM_DENSITY_FACTOR, false, this);
        this.Proxy = setStageProxy(this.world.centerX - 20, 4040, this);
        initTwoWayPacketStream(this.world.centerX - 125, 3000, this.world.centerX + 50, 2850, STREAM_DENSITY_FACTOR, false, this);
        
//        //Set up Stateful FW
//        initTwoWayPacketStream(1370, 1040, 1500, 1040, STREAM_DENSITY_FACTOR, false, this);
//        this.StatefulFW = setStageStatefulFW(1580, 1000, this);
//        
//        
//        //Set up IPS
//        this.IPS = setStageIPS(1580, 1570, this);
//        initTwoWayPacketStream(1370, 1630, 1700, 1630, STREAM_DENSITY_FACTOR, false, this);
//
//        
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
        addCollision(this.routerSprite3, this);
        addCollision(this.routerSprite4, this);


        addCollision(this.IPS, this);
        addCollision(this.StatefulFW, this);
        addCollision(this.ACL, this);

  
        updateHelperSpritePos(this);

    },
}

Game.Stage_3 = function (game) {
    this.IPS;
    this.StatefulFW;
    this.routerSprite1;
    this.routerSprite2;
};

Game.Stage_3.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5', 'tileset6', 'tileset7', 'tileset8', ], this);
        initDialogue(this);

        //Set up Router Rooms
        this.routerSprite1 = setStageRouter(940, 1000, this).routingTableSprite;
        initTwoWayPacketStream(720, 930, 1130, 1040, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(720, 1070, 1130, 1040, STREAM_DENSITY_FACTOR, false, this);

        this.routerSprite2 = setStageRouter(940, 1570, this).routingTableSprite;
        initTwoWayPacketStream(720, 1490, 1130, 1620, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(720, 1630, 1130, 1620, STREAM_DENSITY_FACTOR, false, this);
        
        //Set up Stateful FW
        initTwoWayPacketStream(1370, 1040, 1500, 1040, STREAM_DENSITY_FACTOR, false, this);
        this.StatefulFW = setStageStatefulFW(1580, 1000, this);
        
        
        //Set up IPS
        this.IPS = setStageIDS(1580, 1570, this);
        initTwoWayPacketStream(1370, 1630, 1700, 1630, STREAM_DENSITY_FACTOR, false, this);

        
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
        addCollision(this.IPS, this);
        addCollision(this.StatefulFW, this);
        
        updateHelperSpritePos(this);

    },
}

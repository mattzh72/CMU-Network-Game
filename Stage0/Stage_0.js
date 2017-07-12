Game.Stage_0 = function (game) {
    this.packetStream1 = {};
};

Game.Stage_0.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1'], this);
        initDialogue(this);
        
        this.camera.setPosition(this.game.world.centerX, 0);
        
        //init network diagram
        let networkDiagram1 = addSprite('', '', 'networkDiagram1', this.game.world.centerX - 200, 0, 1, 0, false, this);
        let networkDiagram2 = addSprite('', '', 'networkDiagram2', this.game.world.centerX + 400, 350, 1, 0, false, this);
        let networkDiagram3 = addSprite('', '', 'networkDiagram3', this.game.world.centerX + 400, 100, 1, 0, false, this);
        let networkDiagram4 = addSprite('', '', 'networkDiagram4', this.game.world.centerX - 200, 350, 1, 0, false, this);



        //set up guide sprite
        let guideTextArr = [
            "Hey there! I know you're probably wondering what's going on - don't worry, I'm here to be your game guide. This popup on the bottom of your screen is called the dialogue box, and it will show up whenever you are interacting with something on screen. Now click on the dialogue box to advance the dialogue!",
            "This game is about computer networks: networking, network security, and network testing. Although you probably use computer networks everyday, this topic is complex and evolving everyday.",
            "This game tries to put these complex topics in a more digestable and friendly form, so anyone can understand the world of computer networks. We will cover much of networks basics, from basic network elements like routers and clients, to advanced functions like proxies or an IPS.",
            "You can look at what's in the game world by using the traditional WASD keys. Try it now and see if you can find any interesting things in the world! Close this dialogue by pressing the ESC key, and I will return when you have found something interesting."
        ];
        let guideSpriteData = initGuideSprite(guideTextArr, this);
        this.time.events.add(1000, openDialogue, {
            spriteData: guideSpriteData,
            gameInstance: this
        });

    },

    update: function () {
        updateDialoguePos(this);
        pollCameraControls(this);
        updateHelperSpritePos(this);

//        updatePacketPos(this.packetStream1, this);


    },
}

Game.Stage_3 = function (game) {
    this.packetStream1 = {};
    this.packetStream2 = {};

};

Game.Stage_3.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2','tileset3', 'tileset4'], this);
        initDialogue(this);

        //Set up Router Room
        setStageRouter(this.world.centerX - 400, 350, this);
        this.packetStream1 = initPacketStream(this.world.centerX - 610, 260, this.world.centerX - 210, 260, false, this);
        
        //Set up NAT Room
        setStageNAT(this.world.centerX + 400, 350, this);
        this.packetStream2 = initPacketStream(this.world.centerX + 160, 260, this.world.centerX + 560, 260, false, this);

        //Set up client sprite
        let client = addSprite("Client", clientDialogue, 'computer', 100, 280, 0.5, 0, false, this).instance;

        //Set up server sprite
        let server = addSprite("Server", serverDialogue , 'server1', 2300, 280, 0.6, 0, false, this).instance; 



        //set up guide sprite
        let guideTextArr = [
//            "Hey there! I am your game guide through this course. I will show you around and give you tips on how to play! Don't worry about losing me - I'll be always hovering near your mouse. Now press the right arrow key to see what I have to say next.",
//            "This level is to teach you the basic components of every network: a client, a router, and a server. You probably heard about these before! They're pretty common.",
//            "A CLIENT is usually used by a person to perform some kind of action, like checking your email. This action sends network traffic asking a SERVER to help with the action - and the ROUTER helps direct that traffic in the right direction.", 
//            "But don't let me tell you about it - after I'm done talking, you should click around and see what you can find!",
//            "Oh and by the way, if you forgot what I said before, you can always press the left arrow key to go back to my previous tips.",
            "Press C to Close",
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
        
        addCollision(NAT, this);
        addCollision(routingTableSprite, this);

        updatePacketPos(this.packetStream1, this);
        updatePacketPos(this.packetStream2, this);


    },
}

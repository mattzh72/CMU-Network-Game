Game.Stage_3 = function (game) {
    this.packetStream1 = {};
    this.textureArrServer = ['server1', 'server2', 'server3', 'server4'];
};

Game.Stage_3.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2'], this);
        initDialogue(this);

        //Set up Router Room
        setStageRouter(1025, 430, this);
        this.packetStream1 = initPacketStream(830, 330, 1230, 330, true, this);

        //Set up client sprite
        let client = addSprite("Client", clientDialogue, 'computer', 430, 400, 0.4, 0, true, this).instance;
        client.events.onInputDown.add(toggleClicked, {
            sprite: client        });

        //Set up server sprite
        let server = addSprite("Server", serverDialogue , 'server1', 1580, 400, 0.4, 0, true, this).instance;
        server.events.onInputDown.add(toggleClicked, {
            sprite: server,
        });
        this.time.events.loop(Phaser.Timer.SECOND * 3, loadTexture, {
            sprite: server,
            textureArr: this.textureArrServer,
            gameInstance: this
        });


        //set up guide sprite
        let guideTextArr = [
            "Hey there! I am your game guide through this course. I will show you around and give you tips on how to play! Don't worry about losing me - I'll be always hovering near your mouse. Now press the right arrow key to see what I have to say next.",
            "This level is to teach you the basic components of every network: a client, a router, and a server. You probably heard about these before! They're pretty common.",
            "A CLIENT is usually used by a person to perform some kind of action, like checking your email. This action sends network traffic asking a SERVER to help with the action - and the ROUTER helps direct that traffic in the right direction.", 
            "But don't let me tell you about it - after I'm done talking, you should click around and see what you can find!",
            "Oh and by the way, if you forgot what I said before, you can always press the left arrow key to go back to my previous tips.",
            "Press C to Close",
        ];
        let guideSpriteData = initGuideSprite(guideTextArr, this);
        this.time.events.add(1000, openDialogue, {
            spriteData: guideSpriteData,
            gameInstance: this
        });


        /**
         * An internal function for loading textures of sprites rhythmically 
         * @param {object} sprite     - The sprite to load the texture
         * @param {Array} textureArr - An array of texture keys cached in the game state
         */
        function loadTexture() {
            this.sprite.loadTexture(this.textureArr[Math.floor(this.gameInstance.time.totalElapsedSeconds() % this.textureArr.length)]);
        }
    },

    update: function () {
        updateDialoguePos(this);
        pollCameraControls(this);
        updateHelperSpritePos(this);

        addCollision(NAT, this);
        addCollision(routingTableSprite, this);

        updatePacketPos(this.packetStream1, this);

    },
}

Game.Stage_0 = function (game) {
    this.packetStream1 = {};
    this.guideSpriteData;
    this.dialogueHasBeenOpened = {
        roomsExplanation: false,
        spriteExplanation: false,
        pipeExplanation: false,
        clientServerExplanation: false,
        endTutorial: false,
    };
    
    this.triggerDialogue = function(startY, endY, dialogue, openedBool){
        if (dialogueOpen === "false" && this.dialogueHasBeenOpened[openedBool] == false && guideSprite.body.y > startY && guideSprite.body.y < endY) {
            this.dialogueHasBeenOpened[openedBool]= true;
            this.guideSpriteData.dialogue = dialogue;
            
            this.time.events.add(1, openDialogue, {
                spriteData: this.guideSpriteData,
                gameInstance: this
            });
        }        
    }
    
};

Game.Stage_0.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1'], this);
        initDialogue(this);

        this.camera.setPosition(this.game.world.centerX - window.innerWidth / 2, 0);

        //init network diagrams
        let networkDiagram2 = addSprite('', '', 'networkDiagram2', this.game.world.centerX, 350, 1, 0, false, this);
        let networkDiagram3 = addSprite('', '', 'networkDiagram3', this.game.world.centerX, 200, 1, 0, false, this);
        let networkDiagram4 = addSprite('Network Diagram', ['I am clickable!'], 'networkDiagram4', this.game.world.centerX, 50, 1, 0, true, this);

        //init Rooms
        let blueRoom = addSprite('Router Room', ['If you see me, that means there is a router in this network!'], 'blueRoom', this.game.world.centerX, 850, 0.5, 0, true, this);
        let yellowRoom = addSprite('NAT Room', ['If you see me, that means there is a NAT in this network!'], 'yellowRoom', this.game.world.centerX - 300, 850, 0.5, 0, true, this);
        let pinkRoom = addSprite('Stateful Firewall Room', ['If you see me, that means there is a stateful firewall in this network!'], 'pinkRoom', this.game.world.centerX - 300, 1050, 0.5, 0, true, this);
        let greenRoom = addSprite('ACL Room', ['If you see me, that means there is an ACL in this network!'], 'greenRoom', this.game.world.centerX + 300, 850, 0.5, 0, true, this);
        let purpleRoom = addSprite('Proxy Room', ['If you see me, that means there is a proxy in this network!'], 'purpleRoom', this.game.world.centerX + 300, 1050, 0.5, 0, true, this);
        let sandRoom = addSprite('IPS Room', ['If you see me, that means there is an IPS in this network!'], 'sandRoom', this.game.world.centerX, 1050, 0.5, 0, true, this);
        
        //init sprites
        let NATSprite = addSprite('NAT Worker',['I work in the NAT Room!'], 'NAT', this.game.world.centerX + 50, 1450, 0.5, 0, true, this);
        let routingTableSprite = addSprite('Router Worker',['I work in the Router Room!'], 'routingTableSprite', this.game.world.centerX - 50, 1450, 0.5, 0, true, this);
        let ACLSprite = addSprite('ACL',['I work in the ACL Room!'], 'ACLSprite', this.game.world.centerX + 120, 1450, 0.5, 0, true, this);
        let StatefulFWSprite = addSprite('Stateful Firewall Worker',['I work in the Stateful Firewall Room!'], 'StatefulFW', this.game.world.centerX - 120, 1450, 0.5, 0, true, this);
        let IPS = addSprite('IPS Worker',['I work in the IPS Room!'], 'IPS', this.game.world.centerX + 220, 1450, 0.5, 0, true, this);
        let proxy = addSprite('Proxy Worker',['I work in the proxy Room!'], 'proxy', this.game.world.centerX - 220, 1450, 0.2, 0, true, this);
        
        
        //init pipes
        initPacketStream(this.game.world.centerX - 400, 1750, this.game.world.centerX + 400, 1750, STREAM_DENSITY_FACTOR, false, this);
        let pipe1 = addSprite('Pipe', ['I connect network elements together and packets travel through me!'], 'pipe', this.game.world.centerX - 400, 1750, 1, 0, true, this);
        let pipe2 = addSprite('Pipe', ['I connect network elements together and packets travel through me!'], 'pipe', this.game.world.centerX + 400, 1750, 1, 0, true, this);

        // computer and server
        let computer = addSprite('Client', ['I represent a client in a network'], 'computer', this.game.world.centerX - 200, 2100, 0.3, 0, true, this);
        let server = addSprite('Server', ['I represent a server in a network'], 'server1', this.game.world.centerX + 200, 2090, 0.3, 0, true, this);
        
        let networkDiagram1 = addSprite('Network Diagram', ['I am clickable!'], 'networkDiagram1', this.game.world.centerX, 2500, 1, 0, true, this);



        //set up guide sprite
        let guideTextArr = [
            "Hey there! I know you're probably wondering what's going on - don't worry, I'm here to explain everything. This popup on the bottom of your screen is called the dialogue box, and it will show up whenever you are talking with something on screen. Now click on the dialogue box to advance the dialogue!",
            "This game is about computer networks: networking, network security, and network testing. Although you probably use computer networks everyday, this topic is complex and evolving everyday.",
            "This game tries to put these complex topics in a more digestable and friendly form, so anyone can understand the world of computer networks. We will cover much of networks basics, from basic network elements like routers and clients, to advanced functions like proxies or an IPS.",
            "You can look at what's in the game world by using the traditional WASD keys. You can also detect if something is interactive if you hover over it and see it change size. Try to find the diagram behind me that are interactive!",
            "You can close the dialogue box whenever by pressing the ESC key. Now go out and find more things to click on!"
        ];
        this.guideSpriteData = initGuideSprite(guideTextArr, this);
        this.time.events.add(1000, openDialogue, {
            spriteData: this.guideSpriteData,
            gameInstance: this
        });

    },

    update: function () {
        updateDialoguePos(this);
        pollCameraControls(this);
        updateHelperSpritePos(this);

        this.triggerDialogue(850, 1050, 
            [
                "In this game, different colored roooms represent different functions. For example, the blue room represents a router and the green room represents an Access Control List (or an ACL). Don't worry if you don't know what these are exactly yet - well be covering these in great detail!",
                "Now close this dialogue and click on these rooms to find out what they represent!",
            ], "roomsExplanation");
        
        this.triggerDialogue(1350, 1550, 
            [
                "Each of these rooms will have these little characters, called sprites, working in them. If you click on them, they will tell you valuable information about the rooms they work in: what network function they represent and how it works!"
            ], "spriteExplanation");
        
        
        this.triggerDialogue(1650, 1850, 
            [
                "Eventually, you will start seeing a lot of these pipes and what looks like mail flying through them. In this game, the envelopes represent network traffic - information (data) that is flying through the network functions from place to place.",
                "The pipes are there to show the direction of traffic and how the network parts are linked up together. You can use the WASD keys to fly back up and look at the network diagrams - it may help you understand what I mean!"
            ], "pipeExplanation");
        
        this.triggerDialogue(2000, 2200, 
            [
                "Finally, this brings us to the last thing in this intro. You will see these icons behind me that look like a comuter and a server - that is exactly what they are! These represents a client (left) and a server (right), two very, very important pieces of a network. You will see this around often."
            ], "clientServerExplanation");
        
        this.triggerDialogue(2250, 2600, 
            [
                "And that brings us to the ending of this tutorial! You have successfully learned about all the parts in this game. Now go out and play!",
            ], "endTutorial");

        updatePacketPositions(this);
    },
}

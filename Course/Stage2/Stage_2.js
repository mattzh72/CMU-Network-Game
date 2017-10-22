Game.Stage_2 = function(game){
    this.ACL;
    this.StatefulFW;
    this.Proxy;
    this.IPS;
    this.NAT;
    
    this.guideTextArr = [
        "This module is about security in networks.  Network security is a very general term. This includes any action that network operators take to control the network.",

        "Network operators implement security measures to prevent the misuse of their networks. This includes a whole host of possible scenarios.",

        "Network operators may want to restrict access to certain websites. They may want to prevent outside networks to gain access into their network. They may want to be alerted if packets contain certain types of content.",

        "Each of these scenarios can be met by integrating “network functions” into the network. These network functions are usually used to control the flow of data in the network, or essentially, secure a network.",

        "Each network function can do certain things, and are designed to help network operators fit certain scenarios.",

        "This module introduces four main network functions: Access Control Lists, Stateful Firewalls, Proxies, and Intrusion Prevention Systems.",

        "Click on the colored characters inside the rooms and their tools to learn more!",    
    ];
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
        initPacketStream(610, 1525, 1000, 1525, STREAM_DENSITY_FACTOR, false, this);         
        this.Proxy = setStageProxy(this.world.centerX, 1345, this);
        
        //IPS
        initPacketStream(610, 2065, 1000, 2065, STREAM_DENSITY_FACTOR, false, this);      
        this.IPS = setStageIPS(this.world.centerX, 2000, this);
        
        //NAT
        initPacketStream(610, 2440, 1000, 2440, STREAM_DENSITY_FACTOR, false, this);      
        this.NAT = setStageNAT(this.world.centerX, 2530, this);
        
        let guideSpriteData = initGuideSprite(this.guideTextArr, this);
        this.time.events.add(100, openDialogue, {
            spriteData: guideSpriteData,
            gameInstance: this
        });
    },
    
    update: function(){ 
        //update packet stream positions
        updatePacketPositions(this);

        addCollision(this. ACL, this);
        addCollision(this.StatefulFW, this);
        addCollision(this.IPS, this);
        addCollision(this.NAT, this);
        addCollision(this.Proxy, this);

        updateHelperSpritePos(this);

        updateDialoguePos(this);
        
        pollCameraControls(this);
        
    }, 
}
    
    



Game.Stage_3 = function (game) {
    this.IPS;
    this.StatefulFW;
    this.ACL;
    this.Proxy;

    this.routerSprite1;
    this.routerSprite2;
    this.routerSprite3;
    this.routerSprite4;

    this.guideTextArr = [
        "This module is about policies in networks.",

        "Policies define how data moves through a network. They are essentially a description of how a network should behave.",

        "The engineering of a network to match a policy is called “network configuration”, or “network setup”, usually done by the network operator or system administrator.",

        "This contains the following three tasks:",

        "First, the routers need to be configured. This includes specifying the correct route settings, IP addresses, etc. The details vary, but in general, router configurations help determine how routers route data.",

        "Secondly, the clients need to be configured. This is basically setting up a network connection on the client by logging in default network settings (IP addressing, network name, ID/password).",

        "You probably do this everyday when you connect to the internet. But you don’t need to log in all the settings - your computer probably automatically handles all of that!",

        "Finally, the network functions need to be configured. This includes the ACL, IPS, or other functions. They need to be configured correctly (such as adding rules to the ACL) and given access to the network to monitor the network correctly.",

        "Together, these network configurations (when done correctly) should satisfy the intended usage.",

        "But this is a very hard problem - in fact, it is still largely an unsolved and incomplete problem in the field of computer networks.",

        "Both policies and configurations are usually human-generated. When networks get really, really complicated, the configurations may not match the policies fully, and malicious users will exploit these hidden loopholes in the network defenses.",

        "There really isn’t a standard for how policies are displayed. Sometimes they are written rules. Other times they are graphs.",

        "In this course, however, policies will be give in a specific format. Policies will be a collection of descriptions of how different types of data move through the network.",

        "For example, there may be a packet that came from Client No. 1 headed towards Client No. 2. This packet will go through a router, go through the ACL, and be dropped.",

        "This packet with source “Client No. 1” and destination “Client No. 2” behaves in the described way. And this description, along with more descriptions of how other packets move in the network, make up the policy that describes how data moves in a network.",
    ];

    this.policyACLDialogue = [

        "A policy for a network with an ACL should only take into account stateless packet details - such as the source of the packet.",

        "A sample policy could be like this:",

        '"Data packets from facebook.com should be dropped.”',

        "This policy can be implemented in many different ways. Here is one:",

        "A network operator can attach an ACL to a router, and configure the router to send all packets through the ACL.",

        "The ACL can then be configured to check the source of the packet, and if it is from facebook.com, drop the packet.",

        "Can you think of another configuration?",
    ];

    this.policyProxyDialogue = [
        "A policy for a network with a proxy can look deceptively similar to policies for other network functions.",

        "For this course, there is no need to understand policies for proxies. Take an advanced networking course to learn more about these complex servers!",
    ];

    this.policyIPSDialogue = [

        "A policy for a network with an IPS can take into account many different factors.",

        "A configuration for the IPS can include source, destination, content, and even the number/type of previous packets sent through the network.",

        "The previous packets are the signature this course talked about earlier!",

        "A policy could be like this:",

        '“If a 10 or more suspicious packets are noticed coming from a source, drop all future packets from that source.”',

        "This policy can be really complicated to configure, and has many different configurations. A possible configuration is as follows:",

        "The router would have to route all traffic through the IPS.",

        "The IPS can be configured with signatures, patterns of packets to look for. This can take into account the content of the packet.",

        "The IPS can then be configured to take notice of the state of the network, or the history of the connection. If 10 or more packets flag a loaded signature and are from the same source, drop all packets from that source.",
    ];

    this.policyStatefulFWDialogue = [
        "A stateful firewall can take into account source, destination, but also uniquely, the state of the connection.",

        "A common application of a policy for a stateful firewall will involve detecting whether a connection is established or not. Here’s an example policy:",

        '“Allow connections to be established if they come from inside of the network. Drop connections if they are originating from the Internet.”',

        "The configuration for this would take into account the state of the connection. The stateful firewall would have to track where the first “establish connection” packet stems from.",

        "If the packet origin is from inside the network, then allow the connection to be established. But if the source of the “establish connection” packet was from the Internet, then drop that packet so the connection cannot be established.",
    ];


};

Game.Stage_3.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1', 'tileset2', 'tileset3', 'tileset4', 'tileset5', 'tileset6', 'tileset7', 'tileset8', 'tileset9', 'tileset10'], this);
        initDialogue(this);
        setStageRouterText("", "");

        //Set up Network 1
        this.routerSprite1 = setStageRouter(this.world.centerX - 20, 1000, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 910, this.world.centerX - 125, 835, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 910, this.world.centerX + 60, 835, STREAM_DENSITY_FACTOR, false, this);
        setStageIPSText(this.policyIPSDialogue);
        this.IPS = setStageIPS(this.world.centerX - 20, 600, this);
        initTwoWayPacketStream(this.world.centerX - 125, 700, this.world.centerX + 60, 700, STREAM_DENSITY_FACTOR, false, this);



        //Set up Network 2
        this.routerSprite2 = setStageRouter(this.world.centerX - 20, 2120, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 2030, this.world.centerX - 125, 1955, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 2030, this.world.centerX + 50, 1955, STREAM_DENSITY_FACTOR, false, this);
        setStageStatefulFWText("", this.policyStatefulFWDialogue);
        this.StatefulFW = setStageStatefulFW(this.world.centerX - 20, 1700, this);
        initTwoWayPacketStream(this.world.centerX - 125, 1820, this.world.centerX + 50, 1820, STREAM_DENSITY_FACTOR, false, this);


        //Set up Network 3
        this.routerSprite3 = setStageRouter(this.world.centerX - 20, 3250, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 3180, this.world.centerX - 125, 3105, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 3180, this.world.centerX + 50, 3105, STREAM_DENSITY_FACTOR, false, this);
        setStageACLText("", this.policyACLDialogue);
        this.ACL = setStageACL(this.world.centerX - 20, 2850, this);
        initTwoWayPacketStream(this.world.centerX - 125, 2980, this.world.centerX + 50, 2980, STREAM_DENSITY_FACTOR, false, this);


        //Set up Network 4
        this.routerSprite4 = setStageRouter(this.world.centerX - 20, 4400, this).routingTableSprite;
        initTwoWayPacketStream(this.world.centerX - 240, 4340, this.world.centerX - 125, 4265, STREAM_DENSITY_FACTOR, false, this);
        initTwoWayPacketStream(this.world.centerX + 170, 4340, this.world.centerX + 50, 4265, STREAM_DENSITY_FACTOR, false, this);
        setStageProxyText(this.policyProxyDialogue);
        this.Proxy = setStageProxy(this.world.centerX - 20, 3900, this);
        initTwoWayPacketStream(this.world.centerX - 125, 4130, this.world.centerX + 50, 4130, STREAM_DENSITY_FACTOR, false, this);

        //set up guide sprite
        let guideSpriteData = initGuideSprite(this.guideTextArr, this);
        this.time.events.add(100, openDialogue, {
            spriteData: guideSpriteData,
            gameInstance: this
        });
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
        addCollision(this.Proxy, this);


        updateHelperSpritePos(this);

    },
}

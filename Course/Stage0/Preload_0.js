Game.Preload_0 = function(game){};

Game.Preload_0.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage0/Map/map_0.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Course/Stage0/Map/background.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR NETWORK DIAGRAMS
    this.load.image('networkDiagram1', 'Course/Stage0/Map/networkDiagram1.png');
    this.load.image('networkDiagram2', 'Course/Stage0/Map/networkDiagram2.png');
    this.load.image('networkDiagram3', 'Course/Stage0/Map/networkDiagram3.png');
    this.load.image('networkDiagram4', 'Course/Stage0/Map/networkDiagram4.png');

        
    //ROOM ASSETS
    this.load.image('blueRoom','Course/Stage0/Map/Rooms/blue_room.png');
    this.load.image('yellowRoom','Course/Stage0/Map/Rooms/yellow_room.png');
    this.load.image('pinkRoom','Course/Stage0/Map/Rooms/pink_room.png');
    this.load.image('greenRoom','Course/Stage0/Map/Rooms/green_room.png');
    this.load.image('purpleRoom','Course/Stage0/Map/Rooms/purple_room.png');
    this.load.image('sandRoom','Course/Stage0/Map/Rooms/sand_room.png');
        
    //ASSETS FOR CLIENT
    this.load.image('computer','Course/Stage0/Map/computer.png'); 
        
    //ASSETS FOR SERVER
    this.load.image('server1','Course/Stage0/Map/server_1.png');
    this.load.image('server2','Course/Stage0/Map/server_2.png');
    this.load.image('server3','Course/Stage0/Map/server_3.png');
    this.load.image('server4','Course/Stage0/Map/server_4.png');
        
    //CHARACTER ASSETS
    preloadNetworkFuncAssets(["NAT", "Router", "ACL", "StatefulFW", "IPS", "Proxy"], this);
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //ASSETS FOR ITEMS
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //ASSETS FOR PIPES
    this.load.image('pipe','Course/Stage0/Map/pipe.png');

    //READ JSON MAP FILE
    readJSON('Course/Stage0/Map/map_0.json');
},
    
    create:function(){
        this.state.start('Stage_0');
    }
};
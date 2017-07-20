Game.Preload_5 = function(game){};

Game.Preload_5.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage5/Map/map_5.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Course/Stage5/Map/Rooms/blue_room.png'); this.load.image('tileset2','Course/Stage5/Map/Rooms/green_room.png');
    this.load.image('tileset3','Course/Stage5/Map/Rooms/yellow_room.png');
    this.load.image('tileset4','Course/Stage5/Map/Rooms/purple_room.png');
    this.load.image('tileset5','Course/Stage5/Map/pipe_connector.png');
    this.load.image('tileset6','Course/Stage5/Map/pipe.png');
    this.load.image('tileset7','Course/Stage5/Map/pipe_opening.png');
    this.load.image('tileset8','Course/Stage5/Map/computer_resize.png');
    this.load.image('tileset9','Course/Stage5/Map/Servers/1.png');
        
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR ROOMS
    preloadNetworkFuncAssets(["Router", "Proxy", "NAT", "ACL"], this);
        
    //HELPER SPRITE ASSETS
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');

    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Course/Stage5/Map/map_5.json');
},
    
    create:function(){
        this.state.start('Stage_5');
    }
};




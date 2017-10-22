Game.Preload_3 = function(game){};

Game.Preload_3.prototype = {
    preload: function(){
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage3/Map/map_3.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Course/Stage3/Map/Rooms/blue_room.png'); this.load.image('tileset2','Course/Stage3/Map/Rooms/sand_room.png');
    this.load.image('tileset3','Course/Stage3/Map/Rooms/pink_room.png');
    this.load.image('tileset4','Course/Stage3/Map/pipe_connector.png');
    this.load.image('tileset5','Course/Stage3/Map/pipe.png');
    this.load.image('tileset6','Course/Stage3/Map/pipe_opening.png');
    this.load.image('tileset7','Course/Stage3/Map/computer.png');
    this.load.image('tileset8','Course/Stage3/Map/Servers/1.png');
    this.load.image('tileset9','Course/Stage3/Map/Rooms/green_room.png');
    this.load.image('tileset10','Course/Stage3/Map/Rooms/purple_room.png');
        
    this.load.image('tooltip', 'Puzzle/Assets/rectangle_panel.png');

    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR ROOMS
    preloadNetworkFuncAssets(["Router", "IPS", "StatefulFW", "ACL", "Proxy"], this);
        
    //HELPER SPRITE ASSETS
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');

    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Course/Stage3/Map/map_3.json');
},
    
    create:function(){
        this.state.start('Stage_3');
    }
};




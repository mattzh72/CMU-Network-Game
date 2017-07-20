Game.Preload_4 = function(game){};

Game.Preload_4.prototype = {
    preload: function(){
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage4/Map/map_4.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Course/Stage4/Map/Rooms/blue_room.png'); this.load.image('tileset2','Course/Stage4/Map/Rooms/sand_room.png');
    this.load.image('tileset3','Course/Stage4/Map/Rooms/pink_room.png');
    this.load.image('tileset4','Course/Stage4/Map/pipe_connector.png');
    this.load.image('tileset5','Course/Stage4/Map/pipe.png');
    this.load.image('tileset6','Course/Stage4/Map/pipe_opening.png');
    this.load.image('tileset7','Course/Stage4/Map/computer_resize.png');
    this.load.image('tileset8','Course/Stage4/Map/Servers/1.png');
        
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR ROOMS
    preloadNetworkFuncAssets(["Router", "IPS", "StatefulFW"], this);
        
    //HELPER SPRITE ASSETS
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');

    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Course/Stage4/Map/map_4.json');
},
    
    create:function(){
        this.state.start('Stage_4');
    }
};




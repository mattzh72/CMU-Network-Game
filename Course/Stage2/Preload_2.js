Game.Preload_2 = function(game){};

Game.Preload_2.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage2/Map/map_2.json', null, Phaser.Tilemap.TILED_JSON); 
    this.load.image('tileset1','Course/Stage2/Map/pipe_opening.png');
    this.load.image('tileset2','Course/Stage2/Map/Rooms/green_room.png');
    this.load.image('tileset3','Course/Stage2/Map/Rooms/pink_room.png');
    this.load.image('tileset4','Course/Stage2/Map/Rooms/purple_room.png');
    this.load.image('tileset5','Course/Stage2/Map/Rooms/sand_room.png');
    this.load.image('tileset6','Course/Stage2/Map/Rooms/yellow_room.png');  
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
   
    //ASSETS FOR ROOMS
    preloadNetworkFuncAssets(["ACL", "StatefulFW", "IPS", "Proxy", "NAT"], this);
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //PRELOAD JSON MAP FILE
    readJSON('Course/Stage2/Map/map_2.json');
        
    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
},
    
    create:function(){
        this.state.start('Stage_2');
    }
};
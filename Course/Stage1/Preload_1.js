Game.Preload_1 = function(game){};

Game.Preload_1.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Course/Stage1/Map/map_1.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Course/Stage1/Map/pipe.png');
    this.load.image('tileset2','Course/Stage1/Map/pipe_opening.png');
    this.load.image('tileset3','Course/Stage1/Map/Rooms/blue_room.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR CLIENT
    this.load.image('computer','Course/Stage1/Map/computer.png'); 
    this.load.image('phone','Course/Stage1/Map/phone.png');
    this.load.image('laptop','Course/Stage1/Map/laptop.png');
        
    //ASSETS FOR SERVER
    this.load.image('server1','Course/Stage1/Map/Servers/1.png');
    this.load.image('server2','Course/Stage1/Map/Servers/2.png');
    this.load.image('server3','Course/Stage1/Map/Servers/3.png');
    this.load.image('server4','Course/Stage1/Map/Servers/4.png');
        
    this.load.image('tooltip', 'Puzzle/Assets/rectangle_panel.png');
        
    //ASSETS FOR ROUTER
    preloadNetworkFuncAssets(["Router"], this);

        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Course/Stage1/Map/map_1.json');
},
    
    create:function(){
        this.state.start('Stage_1');
    }
};
Game.Preload_3 = function(game){};

Game.Preload_3.prototype = {
    preload: function(){
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage3/Map/map_3.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage3/Map/Rooms/blue_room.png'); this.load.image('tileset2','Stage3/Map/Rooms/sand_room.png');
    this.load.image('tileset3','Stage3/Map/Rooms/pink_room.png');
    this.load.image('tileset4','Stage3/Map/pipe_connector.png');
    this.load.image('tileset5','Stage3/Map/pipe.png');
    this.load.image('tileset6','Stage3/Map/pipe_opening.png');
    this.load.image('tileset7','Stage3/Map/computer_resize.png');
    this.load.image('tileset8','Stage3/Map/Servers/1.png');
        
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR ROOMS
    //ROUTER
    this.load.atlas('routingTableSprite', 'Modules/Assets/routing_table_sprite.png', 'Modules/assets/routing_table_sprite.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('routingTable','Modules/Assets/routing_table.png');
        
    //STATEFUL FW
    this.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ConnectionTable', 'Modules/Assets/small_screens.png'); 
        
    //IPS
    this.load.atlas('IPS', 'Modules/Assets/IPS.png', 'Modules/assets/IPS.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
    //HELPER SPRITE ASSETS
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');

    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Stage3/Map/map_3.json');
},
    
    create:function(){
        this.state.start('Stage_3');
    }
};




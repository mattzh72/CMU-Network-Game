Game.Preload_3 = function(game){};

Game.Preload_3.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage3/Map/map_3.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage3/Map/room.png');
    this.load.image('tileset2','Stage3/Map/pipe_opening.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR CLIENT
    this.load.image('computer','Stage3/Map/computer.png'); 
    this.load.image('phone','Stage3/Map/phone.png');
    this.load.image('laptop','Stage3/Map/laptop.png');
        
    //ASSETS FOR SERVER
    this.load.image('server1','Stage3/Map/server_1.png');
    this.load.image('server2','Stage3/Map/server_2.png');
    this.load.image('server3','Stage3/Map/server_3.png');
    this.load.image('server4','Stage3/Map/server_4.png');
        
    //ASSETS FOR ROUTER
    this.load.atlas('NAT', 'Modules/Assets/NAT.png', 'Modules/assets/NAT.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('routingTableSprite', 'Modules/Assets/routing_table_sprite.png', 'Modules/assets/routing_table_sprite.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('routingTable','Modules/Assets/routing_table.png');

        
    //ASSETS FOR HELPER SPRITE
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
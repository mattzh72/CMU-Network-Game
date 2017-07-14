Game.Preload_4 = function(game){};

Game.Preload_4.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage4/Map/map_4.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage4/Map/Rooms/blue_room.png'); this.load.image('tileset2','Stage4/Map/Rooms/green_room.png');
    this.load.image('tileset3','Stage4/Map/Rooms/yellow_room.png');
    this.load.image('tileset4','Stage4/Map/Rooms/purple_room.png');
    this.load.image('tileset5','Stage4/Map/pipe_connector.png');
    this.load.image('tileset6','Stage4/Map/pipe.png');
    this.load.image('tileset7','Stage4/Map/pipe_opening.png');
    this.load.image('tileset8','Stage4/Map/computer_resize.png');
    this.load.image('tileset9','Stage4/Map/Servers/1.png');
        
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR ROOMS
    //PROXY
    this.load.image('proxy', 'Modules/Assets/proxy.png');

    //ROUTER
    this.load.atlas('routingTableSprite', 'Modules/Assets/routing_table_sprite.png', 'Modules/assets/routing_table_sprite.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('routingTable','Modules/Assets/routing_table.png');
        
    //NAT
    this.load.atlas('NAT', 'Modules/Assets/NAT.png', 'Modules/assets/NAT.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('NATScreen', 'Modules/Assets/NAT_screen.png');

        
    //ACL
    this.load.atlas('ACLSprite', 'Modules/Assets/ACL.png', 'Modules/assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ACLScreen', 'Modules/Assets/ACL_screen.png');
        
    //HELPER SPRITE ASSETS
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');

    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
        
    //READ JSON MAP FILE
    readJSON('Stage4/Map/map_4.json');
},
    
    create:function(){
        this.state.start('Stage_4');
    }
};




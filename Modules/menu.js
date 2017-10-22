function openGameMenu(){
    let gameInstance = this.gameInstance;
    
    if (controls.shift.isDown){
        removeControls(gameInstance);
        $("#main-menu-dialog").dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            },
            height: 300,
            width: 250,
            title: "Level Selector",
            close: function () {
                addControls(gameInstance);
            },
        });
        
        $("#main-menu-dialog").dialog("open");
        
        $("#mm-tutorial").button({
            icon: "ui-icon-mail-closed",
        });
        $("#mm-tutorial").unbind().click({
            levelKey: 'Preload_0',
            gameInstance: gameInstance,
        }, goToLevel);
        
        $("#mm-level-1").button({
            icon: "ui-icon-mail-closed",
        });
        $("#mm-level-1").unbind().click({
            levelKey: 'Preload_1',
            gameInstance: gameInstance,
        }, goToLevel);
        
        $("#mm-level-2").button({
            icon: "ui-icon-mail-closed",
        });
        $("#mm-level-2").unbind().click({
            levelKey: 'Preload_2',
            gameInstance: gameInstance,
        }, goToLevel);
        
        $("#mm-level-3").button({
            icon: "ui-icon-mail-closed",
        });
        $("#mm-level-3").unbind().click({
            levelKey: 'Preload_3',
            gameInstance: gameInstance,
        }, goToLevel);

        $("#mm-puzzle").button({
            icon: "ui-icon-mail-closed",
        });
        $("#mm-puzzle").unbind().click({
            levelKey: 'Preload_Puzzle',
            gameInstance: gameInstance,
        }, goToLevel);
    }
}

function goToLevel(event){
    let gameInstance = event.data.gameInstance;
    let levelKey = event.data.levelKey;
    
    packetStreams = [];
    dialogueOpen = "false";
    
    gameInstance.state.start(levelKey); 
    $("#main-menu-dialog").dialog("close");
}
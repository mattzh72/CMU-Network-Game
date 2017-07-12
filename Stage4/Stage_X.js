Game.Stage_X = function (game) {
    this.packetStream1 = {};
};

Game.Stage_X.prototype = {

    create: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1' /*, 'tileset2'*/], this);
        initDialogue(this);

    },

    update: function () {
        updateDialoguePos(this);
        pollCameraControls(this);

    },
}

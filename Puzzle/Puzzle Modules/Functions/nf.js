function nf(nw, type) {
    this.configs = [];
    this.fields = [
        {
            name: "Source",
            title: "The router number that the packet is coming from."
        },
        {
            name: "Destination",
            title: "The router number that the packet is heading towards."
        },
        {
            name: "Content",
            title: "What's inside of the packet?"
        },
        {
            name: "State",
            title: "The state of the connection."
        },
        {
            name: "Tag",
            title: "The value of which to tag the data packet with if it matches the above fields."
        },
    ];

    node.call(this, nw.nfs.length, type);
    nw.nfs.push(this);
}

nf.prototype = Object.create(node.prototype);
nf.prototype.constructor = nf;

nf.prototype.getConfigByID = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        if (this.configs[i].ID == ID) {
            return this.configs[i];
        }
    }
};

nf.prototype.addConfig = function (config) {
    this.configs.push(config);
};

nf.prototype.removeConfig = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        let config = this.configs[i];

        if (config.ID == ID) {
            this.configs.splice(i, 1);
        }
    }
};

nf.prototype.reportConfigs = function () {
    let configsCopy = this.configs.slice(0);
    console.log(configsCopy);

    return this.configs;
};

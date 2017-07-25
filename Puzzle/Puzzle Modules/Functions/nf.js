function nf(nw, type) {
    this.configs = [];
    nw.nfs.push(this);
    
    node.call(this, nw.nfs.length, type);
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

nf.prototype.addConfig = function (src, dst, cont, state, action) {
    let config = {
        ID: this.configs.length,
        Source: src,
        Destination: dst,
        Content: cont,
        State: state,
        Action: action,
    };

    this.configs.push(config);
    return config;
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


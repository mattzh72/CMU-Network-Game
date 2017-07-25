function node(ID, type) {
    this.ID = ID;
    this.type = type;
}

node.prototype.equals = function (otherNode) {
    return this.ID == otherNode.ID && this.type == otherNode.type;
}

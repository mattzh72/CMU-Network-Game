let testPacketFields;

function openPacketModal() {
    let gameInstance = this.gameInstance;
    
    $("#packet-dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "blind",
            duration: 1000
        },
        height: 400,
        width: 500,
        title: "Deploy A Test Packet",
        close: function () {
            addControls(gameInstance);
        },
    });
    
    $("label").tooltip();
    
    $("#packet-button-deploy").button({
        icon: "ui-icon-mail-closed",
    });
    $("#packet-button-deploy").unbind().click({
        nw: this.nw, 
        src: $("#packet-source"), 
        dest: $("#packet-destination"), 
        tags: $("#packet-tags"), 
        content: $("#packet-content"),
        gameInstance: gameInstance,
    }, testPacketWrapper);
    
    removeControls(gameInstance);
    
    $("#packet-dialog").dialog("open");
    
}

function openResultsModal(packet, path){
    packet.sprite.body.velocity.x = 0;
    packet.sprite.body.velocity.y = 0;
    
    $("#packet-results-table").remove();
    let section = "<table id ='packet-results-table'>"
    section += "<tr>";
    section += "<th>";
    section += "Order";
    section += "</th>";
    section += "<th>";
    section += "Location";
    section += "</th>";
    section += "<th>";
    section += "Packet Tags";
    section += "</th>";
    section += "</tr>";
    for (let i = 0; i < path.length; i++) {
        let entry = path[i];
        section += "<tr>";
        section += "<td>";
        section += i+1;
        section += "</td>";
        section += "<td>";
        section += entry.loc.type + " " + entry.loc.ID;
        section += "</td>";
        section += "<td>";
        section += (entry.tags.length === 0) ? "(None)":entry.tags;
        section += "</td>";
        section += "</tr>";
    }
    section += "</table>";

    $("#packet-results-dialog").append(section);
    
    $("#packet-results-dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "blind",
            duration: 1000
        },
        height: 400,
        width: 500,
        title: "Testing Results",
        close: function () {
            packet.sprite.destroy();
        },
    });
    
     $("#packet-results-dialog").dialog("open");
}


function testPacketWrapper(event){
    event.preventDefault();
    let nw = event.data.nw;
    let src = event.data.src;
    let dest = event.data.dest;
    let tags = event.data.tags;
    let content = event.data.content;
    let gameInstance = event.data.gameInstance;
            
    if (checkCompleteness([src, dest])){
        testPacket(nw, src.val(), dest.val(), tags.val(), content.val(), gameInstance);
    }
    
    $("#packet-dialog").dialog("close");
}

function checkCompleteness(fields) {
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (field.val().length == 0) {
            field.addClass("ui-state-error");
            updateTips("Length of input must be greater than 0.");
            return false;
        }

        if (field.val().replace(/\s+/, "") === "") {
            field.addClass("ui-state-error");
            updateTips("Input cannot be solely comprised of spaces.");
            return false;
        }
    }

    return true;
}


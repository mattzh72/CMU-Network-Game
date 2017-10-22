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
        height: 600,
        width: 400,
        title: "Deploy A Test Packet",
        close: function () {
            addControls(gameInstance);
        },
    });

    $("label").tooltip();
    $("#packet-dialog-tabs").tabs();

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

    if (this.nw.policyPackets){
        displayPolicyPackets(this.nw.policyPackets, "packet-dialog-tabs-2");
    }

    removeControls(gameInstance);

    $("#packet-dialog").dialog("open");

}

function openResultsModal(packet, path, gameInstance) {
    if (packet.sprite) {
        packet.sprite.body.velocity.x = 0;
        packet.sprite.body.velocity.y = 0;
    }

    let section = displayPacketInfoAsTable(path, "packet-results-table");

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
            if (packet.sprite) {
                packet.sprite.destroy();
            }

            addControls(gameInstance);
        },
    });

    $("#packet-results-dialog").dialog("open");
}

function displayPolicyPackets(policyPacketData, parentDivID) {
    $("#policy-packet-accordion").remove();
    
    $("#" + parentDivID).append('<div id="policy-packet-accordion"></div>');
    
    let section = "";
    for (let i = 0; i < policyPacketData.length; i++) {
        let path = policyPacketData[i].path;
        let packet = policyPacketData[i].packet;        
        let tableID = "policy-packet-table-" + i;
        
        section += "<h3>Policy Packet No. " + i + "</h3>";
        section += '<div id ="policy-packet-'+ i + '-table-container">';
        section += "<p>A packet with source ";
        section += packet.source.type + " " + packet.source.ID;
        section += " and destination ";
        section += packet.destination.type + " " + packet.destination.ID;
        section += " would travel the following path: ";
        section += displayPacketInfoAsTable(path, tableID);
        section += "</div>";
    }
    
    $("#policy-packet-accordion").append(section);
    
    $("#policy-packet-accordion").accordion({
        heightStyle: "content",
        collapsible: true,
    });
    
}


function displayPacketInfoAsTable(path, tableID) {
    $("#" + tableID).remove();
    let section = "<table id ='" + tableID + "'>";
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
        section += i + 1;
        section += "</td>";
        section += "<td>";
        section += entry.loc.type + " " + entry.loc.ID;
        section += "</td>";
        section += "<td>";
        section += (entry.tags.length === 0) ? "(None)" : entry.tags;
        section += "</td>";
        section += "</tr>";
    }
    section += "</table>";

    return section;
}


function testPacketWrapper(event) {
    event.preventDefault();
    let nw = event.data.nw;
    let src = event.data.src;
    let dest = event.data.dest;
    let tags = event.data.tags;
    let content = event.data.content;
    let gameInstance = event.data.gameInstance;

    if (checkCompleteness([src, dest])) {
        let testPacketObj = testPacket(nw, src.val(), dest.val(), tags.val(), content.val(), true);
        animatePath(testPacketObj.path, testPacketObj.packet, nw, gameInstance);
    }

    $("#packet-dialog").dialog("close");
}

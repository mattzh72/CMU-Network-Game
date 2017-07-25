let tableInfo = function (nf) {
    let table = nf.routingTable;
    
    $("#routing-table").remove();
    let section = "<div id ='routing-table'><table>"
    section += "<tr>";
    section += "<th>";
    section += "Destination";
    section += "</th>";
    section += "<th>";
    section += "Next Hop";
    section += "</th>";
    section += "<th>";
    section += "Cost";
    section += "</th>";
    section += "</tr>";
    for (let i = 0; i < table.length; i++) {
        let entry = table[i];
        section += "<tr>";
        section += "<td>";
        section += entry.destination;
        section += "</td>";
        section += "<td>";
        section += entry.nextHop;
        section += "</td>";
        section += "<td>";
        section += entry.cost;
        section += "</td>";
        section += "</tr>";
    }
    section += "</table></div>";

    $("#router-tabs-1").append(section);
}

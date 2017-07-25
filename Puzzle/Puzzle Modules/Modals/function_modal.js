let functionInfo = function (nf) {
    $("#function-information").remove();
    let tab = $("#function-tabs-1");
    let section = '<div id = "function-information"><table>';

    section += "<tr>";
    section += "<th>";
    section += "Property";
    section += "</th>";
    section += "<th>";
    section += "Value";
    section += "</th>";
    section += "</tr>";

    section += "<tr>";
    section += "<td>";
    section += "Type";
    section += "</td>";
    section += "<td>";
    section += nf.type;
    section += "</td>";
    section += "</tr>";
       
    section += "<tr>";
    section += "<td>";
    section += "ID";
    section += "</td>";
    section += "<td>";
    section += nf.ID;
    section += "</td>";
    section += "</tr>";
    
    section += "<tr>";
    section += "<td>";
    section += "Attached to";
    section += "</td>";
    section += "<td>";
    section += nf.connectedNode == null ? "(none)":"Router " + nf.connectedNode.ID;
    section += "</td>";
    section += "</tr>";
    
    section += "<tr>";
    section += "<td>";
    section += "Rules";
    section += "</td>";
    section += "<td>";
    section += nf.configs.length;
    section += "</td>";
    section += "</tr>";

    section += "</table>";
    tab.append(section);
}
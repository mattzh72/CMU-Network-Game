function initFields(fieldNameObjects) {
    //reset
    allFieldsObjects = [];
    allFieldsHTML = $([]);

    let formHTML = $('#new-config-form');

    $('#new-config-fieldset').remove();
    let newElement = '<div id="new-config-fieldset">';
    for (let i = 0; i < fieldNameObjects.length; i++) {
        let nameObject = fieldNameObjects[i];
        let name = nameObject.name;
        let labelName = name + "-label";
        let title = nameObject.title;

        newElement += '<label id="' + labelName + '" ';
        newElement += 'title="' + title + '" ';
        newElement += 'for="' + name + '">';
        newElement += name + '</label>';
        newElement += '<input type="text" name="' + name + '" ';
        newElement += 'id="' + name + '" ';
        newElement += 'class="text ui-widget-content ui-corner-all">';
    }
    newElement += '</div>';
    formHTML.append(newElement);

    for (let i = 0; i < fieldNameObjects.length; i++) {
        let jqueryElement = $('#' + fieldNameObjects[i].name);
        allFieldsObjects.push(jqueryElement);
        allFieldsHTML.add(jqueryElement);
    }
}

function addNewConfig(event) {
    let type = event.data.nf.type;
    initFields(event.data.nf.fields);
    let newConfig;

    let dialog = $("#config-dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "blind",
            duration: 1000
        },
        title: "Add a New Rule",
        height: 600,
        width: 400,
        buttons: {
            "Create new configuration": function () {
                newConfig = addNewConfigByType(event.data.nf);
                if (newConfig) {
                    addConfigEntry(event.data.nf, newConfig, event.data.accordion);
                    $(event.data.accordion).accordion("refresh");

                    let buttonID = "#button-delete-config-" + newConfig.ID + "-" + event.data.nf.type + "-" + event.data.nf.ID;
                    $(buttonID).button({
                        icon: "ui-icon-cancel",
                    });
                    $(buttonID).unbind().click({
                        nf: event.data.nf,
                        ID: newConfig.ID,
                    }, deleteConfig);
                    dialog.dialog("close");

                }
            },
            Cancel: function () {
                dialog.dialog("close");
            },
        },
        close: function () {
            for (let i = 0; i < allFieldsObjects.length; i++) {
                allFieldsObjects[i].val("");
            }
            $(".validateTips").text("All form fields are required. If a field is disabled, that means you cannot use it for this type of network function. The * means that that the packet will not be evaluated by that field. For example, an * in the content field means that the action will apply to packets with any type of content.");
            allFieldsHTML.removeClass("ui-state-error");
        }
    });
    $("#config-dialog").dialog("open");
    enableByNames(["State", "Content", "Destination", "Source"]);

    if (event.data.nf.disabledConfigs) {
        removeUnrelatedFields(event.data.nf.disabledConfigs);
    }

    removeControls(event.data.gameInstance);

    if (type === "Router") {
        $("#Forward").autocomplete({
            source: validForwardingDestinations,
            minLength: 0,
            appendTo: "#new-config-fieldset"
        }).click(function () {
            $(this).autocomplete('search', $(this).val())
        });
        $("#Interface").autocomplete({
            source: validInterfaceDestinations,
            minLength: 0,
            appendTo: "#new-config-fieldset"
        }).click(function () {
            $(this).autocomplete('search', $(this).val())
        });
    }

    $("#Source").autocomplete({
        source: validNetworkAddresses,
        minLength: 0,
        appendTo: "#new-config-fieldset"
    }).click(function () {
        $(this).autocomplete('search', $(this).val())
    });
    $("#Destination").autocomplete({
        source: validNetworkAddresses,
        minLength: 0,
        appendTo: "#new-config-fieldset"
    }).click(function () {
        $(this).autocomplete('search', $(this).val())
    });

    $(document).tooltip();
}

function addNewConfigByType(nf) {
    let config = null;
    let lastField = allFieldsObjects[allFieldsObjects.length - 1];

    let allFieldsFilled = checkCompleteness(allFieldsObjects);
    let validForward = true;
    let validInterface = true;
    let validDestination = checkValid($("#Destination"), validNetworkAddresses);
    let validSource = checkValid($("#Source"), validNetworkAddresses);

    if (nf.type === "Router") {
        let nearbyNodeNames = [];
        for (let i = 0; i < nf.edges.length; i++) {
            let node = nf.edges[i].getOtherNode(nf);
            nearbyNodeNames.push(node.type + " " + node.ID);
        }
        validForward = checkValid($("#Forward"), validForwardingDestinations);
        validInterface = checkValid($("#Interface"), validInterfaceDestinations);
    }

    if (allFieldsFilled && validForward && validInterface) {
        let vals = getValues(allFieldsObjects);
        let keys = getIDs(allFieldsObjects);

        config = makeConfig(keys, vals);
        config.ID = nf.configs.length;
        nf.addRule(config);
    }

    return config;
}

function makeConfig(keys, vals) {
    let config = {};

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let val = vals[i];
        config[key] = val;
    }

    return config;
}

function getIDs(array) {
    let IDs = [];
    for (let i = 0; i < array.length; i++) {
        let ID = array[i][0].id;
        IDs.push(ID);
    }
    return IDs;
}

function getValues(array) {
    let values = [];
    for (let i = 0; i < array.length; i++) {
        let value = array[i].val();
        if (value === "") {
            value = "(None)";
        }
        values.push(value);
    }
    return values;
}

function removeUnrelatedFields(unrelatedFields) {
    for (let i = 0; i < unrelatedFields.length; i++) {
        removeByName(unrelatedFields[i]);
    }
}

function removeByName(name) {
    $("#" + name).prop('disabled', true);
    $("#" + name).prop('value', "*");
    $("#" + name).css('opacity', 0.5);
    $("#" + name.charAt(0).toLowerCase() + name.slice(1)).css('opacity', 0.5);
}

function enableByNames(names) {
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        $("#" + name).prop('disabled', false);
        $("#" + name).prop('value', "");
        $("#" + name).css('opacity', 1);
        $("#" + name.charAt(0).toLowerCase() + name.slice(1)).css('opacity', 1);
    }
}

function checkCompleteness(fields) {
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (field[0].name !== "Alert" && field[0].name !== "Rewrite") {
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
    }

    return true;
}

function checkValid(field, validOptions) {
    let fieldVal = field.val();

    let upperCaseFieldVal = fieldVal.toUpperCase();

    if (upperCaseFieldVal.indexOf("CLIENT") !== -1 || upperCaseFieldVal.indexOf("ROUTER") !== -1) {
        fieldVal = fieldVal.toLowerCase();
        fieldVal = fieldVal.charAt(0).toUpperCase() + fieldVal.slice(1);
    }

    if (!validOptions.includes(fieldVal)) {
        field.addClass("ui-state-error");
        updateTips("Could not find this network component.");
        return false;
    }

    return true;
}

function updateTips(t) {
    let tips = $(".validateTips");
    tips
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500);
    }, 500);
}

function deleteConfig(event) {
    event.data.nf.deleteRule(event.data.ID);
    $("#" + event.data.ID).remove();
    $(event.data.accordion).accordion("refresh");
}

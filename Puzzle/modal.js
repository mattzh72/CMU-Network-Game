let source = $("#Source");
let destination = $("#Destination");
let content = $("#Content");
let state = $("#State");
let action = $("#Action");
let allFieldsObjects = [source, destination, content, state, action];
let allFieldsHTML = $( [] ).add( source ).add( destination ).add( content ).add( state ).add( action );

function openModal() {
    if (controls.shift.isDown) {
        removeControls(this.gameInstance);

        $("#function-dialog").prop('title', this.networkFunc.type + " Configuation Tool");
        displayConfigs(this.networkFunc);

        initElements(this.networkFunc, this.gameInstance);

        $("#function-dialog").dialog("open");
    }
}

function initElements(networkFunc, gameInstance) {
    initDialog(gameInstance); //put this first for to allow html button tags to be generated
    initButtons(networkFunc);
}

function initButtons(networkFunc) {
    $("#button-add").button({
        icon: "ui-icon-plus",
    });
    $("#button-add").click({
        networkFunc: networkFunc
    }, addNewConfig);

    for (let i = 0; i < networkFunc.configs.length; i++) {
        let ID = networkFunc.configs[i].ID;
        let buttonID = "#button-delete-config-" + ID;
        $(buttonID).button({
            icon: "ui-icon-cancel",
        });
        $(buttonID).click({
            networkFunc: networkFunc,
            ID: ID,
        }, deleteConfig);
    }
}

function initDialog(gameInstance) {
    $("#function-dialog").dialog({
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
        close: function () {
            addControls(gameInstance);
        }
    });
}

function initAccordion(networkFunc) {
    $("#accordion")
        .accordion({
            header: "> div > h3",
            heightStyle: "content",
            collapsible: true,
        })
        .sortable({
            axis: "y",
            handle: "h3",
            stop: function (event, ui) {
                ui.item.children("h3").triggerHandler("focusout");
                $(this).accordion("refresh");
            },
            update: function (event, ui) {
                var order = $("#accordion").sortable('toArray');
                let newConfigs = [];

                for (let i = 0; i < order.length; i++) {
                    let ID = Number.parseInt(order[i]);
                    let config = networkFunc.getConfigByID(ID);
                    newConfigs.push(config);
                }
                networkFunc.configs = newConfigs;
            }
        });
}

function displayConfigs(networkFunc) {
    initAccordion(networkFunc);

    let configArr = networkFunc.configs;
    $(".group").remove();
    for (let i = 0; i < configArr.length; i++) {
        addConfigEntry(configArr[i]);
    }
    $("#accordion").accordion("refresh");
}

function addConfigEntry(config) {
    section = '<div class="group" id = "' + (config.ID);
    section += '"><h3> Configuration ' + (config.ID + 1) + '</h3><div><table style="width:100%; border: 1px solid grey;">';

    section += "<tr>";
    section += "<th>";
    section += "Attribute";
    section += "</th>";
    section += "<th>";
    section += "Value";
    section += "</th>";
    section += "</tr>";

    for (var key in config) {
        if (config.hasOwnProperty(key)) {
            section += "<tr>";
            section += "<td>";
            section += key;
            section += "</td>";
            section += "<td>";
            section += config[key];
            section += "</td>";
            section += "</tr>";
        }
    }
    section += "</table><button id = 'button-delete-config-" + config.ID;
    section += "' style='margin-top: 40px;'>Delete this Configuration</button></div></div>";

    $("#accordion").append(section);
}

function reorderConfigs(event) {
    var order = $("#accordion").sortable('toArray');
    let newConfigs = [];

    for (let i = 0; i < order.length; i++) {
        let ID = Number.parseInt(order[i]);
        let config = event.data.networkFunc.getConfigByID(ID);
        newConfigs.push(config);
    }
    event.data.networkFunc.configs = newConfigs;
}

function addNewConfig(event) {
    let type = event.data.networkFunc.type;
    let newConfig;
    removeUnrelatedFields(type);

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
        height: 600,
        width: 400,
        buttons: {
            "Create new configuration": function () {
                newConfig = addNewConfigByType(type, event.data.networkFunc);
                if (newConfig) {
                    addConfigEntry(newConfig);
                    $("#accordion").accordion("refresh");

                    let ID = newConfig.ID;
                    let buttonID = "#button-delete-config-" + ID;
                    $(buttonID).button({
                        icon: "ui-icon-cancel",
                    });
                    $(buttonID).click({
                        networkFunc: event.data.networkFunc,
                        ID: ID,
                    }, deleteConfig);
                    dialog.dialog("close");

                }
            },
            Cancel: function () {
                dialog.dialog("close");
            },
        },
        close: function () {
            for (let i = 0; i < allFieldsObjects.length; i++){
                allFieldsObjects[i].val("");
            }
            
            allFieldsHTML.removeClass( "ui-state-error" );
        }
    });
    $("#config-dialog").dialog("open");
}

function addNewConfigByType(type, networkFunc) {
    let config = null;
    
    if (checkCompleteness([source, destination, content, state, action])) {
        if (type == "ACL") {
            config = networkFunc.addRule(source.val(), action.val());
        }
    }


    return config;
}

function removeUnrelatedFields(type) {
    if (type == "ACL") {
        $("#Destination").prop('disabled', true);
        $("#Destination").prop('value', "*");
        $("#Destination").css('opacity', 0.5);
        $("#destination-label").css('opacity', 0.5);
        $("#Content").prop('disabled', true);
        $("#Content").prop('value', "*");
        $("#Content").css('opacity', 0.5);
        $("#content-label").css('opacity', 0.5);
        $("#State").prop('disabled', true);
        $("#State").prop('value', "*");
        $("#State").css('opacity', 0.5);
        $("#state-label").css('opacity', 0.5);
    }
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
    event.data.networkFunc.deleteRule(event.data.ID);
    $("#" + event.data.ID).remove();
    $("#accordion").accordion("refresh");
}

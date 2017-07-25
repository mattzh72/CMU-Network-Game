let source = $("#Source");
let destination = $("#Destination");
let content = $("#Content");
let state = $("#State");
let action = $("#Action");
let allFieldsObjects = [source, destination, content, state, action];
let allFieldsHTML = $([]).add(source).add(destination).add(content).add(state).add(action);
let actions = [];

function openModal() {
    if (controls.shift.isDown) {
        actions = this.nf.availableActions;

        this.displayInformation(this.nf);
        displayConfigs(this.nf, this.accordion); //initialize configuration tab

        $("label").tooltip();
        $(this.tabs).tabs();
        initDialog(this.nf, this.div, this.gameInstance);
        initButtons(this.nf, this.accordion, this.button, this.gameInstance);

        $(this.div).dialog("open");
    }
}

function initButtons(nf, accordion, button, gameInstance) {
    $(button).button({
        icon: "ui-icon-plus",
    });
    $(button).click({
        nf: nf,
        accordion: accordion,
        gameInstance: gameInstance,
    }, addNewConfig);

    for (let i = 0; i < nf.configs.length; i++) {
        let ID = nf.configs[i].ID;
        let buttonID = "#button-delete-config-" + ID;
        $(buttonID).button({
            icon: "ui-icon-cancel",
        });
        $(buttonID).click({
            nf: nf,
            ID: ID,
            accordion: accordion,
        }, deleteConfig);
    }
}

function initDialog(nf, div, gameInstance) {
    $(div).dialog({
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
        title: nf.type + " No. " + nf.ID + " Tool Box",
        close: function () {
            addControls(gameInstance);
        }
    });
}

function initAccordion(nf, accordion) {
    $(accordion)
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
                var order = $(accordion).sortable('toArray');
                let newConfigs = [];

                for (let i = 0; i < order.length; i++) {
                    let ID = Number.parseInt(order[i]);
                    let config = nf.getConfigByID(ID);
                    newConfigs.push(config);
                }
                nf.configs = newConfigs;
            }
        });
}

function displayConfigs(nf, accordion) {
    initAccordion(nf, accordion);

    let configArr = nf.configs;
    $(".group-" + accordion.substr(1)).remove();
    for (let i = 0; i < configArr.length; i++) {
        addConfigEntry(configArr[i], accordion);
    }
    $(accordion).accordion("refresh");
}

function addConfigEntry(config, accordion) {
    section = '<div class="group-' + accordion.substr(1);
    section += '"id = "' + (config.ID);
    section += '"><h3> Rule ' + (config.ID + 1) + '</h3><div><table>';

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
    section += "' style='margin-top: 40px;'>Delete this Rule</button></div></div>";

    $(accordion).append(section);
}

function addNewConfig(event) {
    let type = event.data.nf.type;
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
                    addConfigEntry(newConfig, event.data.accordion);
                    $(event.data.accordion).accordion("refresh");

                    let ID = newConfig.ID;
                    let buttonID = "#button-delete-config-" + ID;
                    $(buttonID).button({
                        icon: "ui-icon-cancel",
                    });
                    $(buttonID).click({
                        nf: event.data.nf,
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
            for (let i = 0; i < allFieldsObjects.length; i++) {
                allFieldsObjects[i].val("");
            }

            allFieldsHTML.removeClass("ui-state-error");
        }
    });
    $("#config-dialog").dialog("open");
    enableByNames(["State", "Content", "Destination", "Source"]);
    removeUnrelatedFields(event.data.nf.disabledConfigs);
    removeControls(event.data.gameInstance);
    $("#Action").autocomplete({
        source: actions,
        minLength: 0,
    });
    $("#Action").bind('focus', function(){ $(this).autocomplete("search"); } );

}

function addNewConfigByType(nf) {
    let config = null;
    let actionVal = action.val().charAt(0).toUpperCase() + action.val().slice(1);

    if (checkCompleteness([source, destination, content, state, action])) {
        config = nf.addRule(source.val(), destination.val(), content.val(), state.val(), actionVal);
    }

    return config;
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

        if (field[0].id === "Action") {
            let fieldVal = field.val();

            if (fieldVal.lastIndexOf(" ") > 0)
                fieldVal = field.val().substr(0, field.val().lastIndexOf(" "));

            if (!actions.includes(fieldVal.charAt(0).toUpperCase() + fieldVal.slice(1))) {
                field.addClass("ui-state-error");
                updateTips("Invalid action for this network component.");
                return false;
            }
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
    event.data.nf.deleteRule(event.data.ID);
    $("#" + event.data.ID).remove();
    $(event.data.accordion).accordion("refresh");
}

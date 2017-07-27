let allFieldsObjects;
let allFieldsHTML;

function openModal() {
    if (controls.shift.isDown) {
        this.displayInformation(this.nf);
        displayConfigs(this.nf, this.accordion);

        $("label").tooltip();
        $(this.tabs).tabs();
        initDialog(this.nf, this.div, this.gameInstance);
        initButtons(this.nf, this.div, this.accordion, this.button, this.gameInstance);

        $(this.div).dialog("open");
    }
}


function initButtons(nf, div, accordion, button, gameInstance) {
    $(button).button({
        icon: "ui-icon-plus",
    });
    $(button).unbind().click({
        nf: nf,
        accordion: accordion,
        gameInstance: gameInstance,
    }, addNewConfig);

    for (let i = 0; i < nf.configs.length; i++) {
        let buttonID = "#button-delete-config-" + nf.configs[i].ID + "-" + nf.type + "-" + nf.ID;
        $(buttonID).button({
            icon: "ui-icon-cancel",
        });
        $(buttonID).unbind().click({
            nf: nf,
            ID: nf.configs[i].ID,
            accordion: accordion,
        }, deleteConfig);
    }

    if (nf.type !== "Router") {
        $("#function-button-delete").button({
            icon: "ui-icon-cancel",
        });
        $("#function-button-delete").unbind().click({
            nf: nf,
            div: div,
        }, deleteNF);
    }
}

function deleteNF(event){
    let nf = event.data.nf;
    nf.destroy();
    $(event.data.div).dialog('close');
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
        addConfigEntry(nf, configArr[i], accordion);
    }
    $(accordion).accordion("refresh");
}

function addConfigEntry(nf, config, accordion) {
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
        if (config.hasOwnProperty(key) && key != "ID") {
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
    section += "</table><button id = 'button-delete-config-" + config.ID + "-" + nf.type + "-" + nf.ID;
    section += "' style='margin-top: 40px;'>Delete this Rule</button></div></div>";

    $(accordion).append(section);
}

function openGameOptionsModal() {
    let gameInstance = this.gameInstance;

    $("#file-contents-textarea").val("");
    $("#game-progress-textarea").val("");

    $("#game-options-dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "blind",
            duration: 1000
        },
        height: 500,
        width: 400,
        title: "Game Configuration",
        close: function () {
            addControls(gameInstance);
        },
    });

    $("label").tooltip();
    $("#game-options-tabs").tabs();
    
    $("#game-options-maker-accordion").accordion({
        heightStyle: "content",
    });
    
    $("#game-options-player-accordion").accordion({
        heightStyle: "content",
    });

    $("#game-options-load").button({
        icon: "ui-icon-plusthick",
    });
    $("#game-options-load").unbind().click(loadFileAsText);

    $("#game-options-encode-progress").button({
        icon: "ui-icon-transferthick-e-w",
    });
    $("#game-options-encode-progress").unbind().click({
        network: this.nw,
        gameInstance: this.gameInstance,
    }, encodeGame);

    $("#game-options-download-progress").button({
        icon: "ui-icon-arrowthickstop-1-s",
    });
    $("#game-options-download-progress").unbind().click({
        file: "progress.json",
        textAreaID: "#game-progress-textarea",
    }, download);
    
    $("#game-options-encode-puzzle").button({
        icon: "ui-icon-transferthick-e-w",
    });
    $("#game-options-encode-puzzle").unbind().click({
        network: this.nw,
        gameInstance: this.gameInstance,
    }, encodePuzzle);

    $("#game-options-download-puzzle").button({
        icon: "ui-icon-arrowthickstop-1-s",
    });
    $("#game-options-download-puzzle").unbind().click({
        file: "puzzle.json",
        textAreaID: "#game-puzzle-textarea",
    }, download);

    $("#game-options-play-game").button({
        icon: "ui-icon-triangle-1-e",
    });
    $("#game-options-play-game").unbind().click({
        network: this.nw,
        gameInstance: this.gameInstance,
    }, playGame);

    $("#game-options-create-new-nw").button({
        icon: "ui-icon-triangle-1-e",
    });
    $("#game-options-create-new-nw").unbind().click({
        network: this.nw,
        gameInstance: this.gameInstance,
    }, generateTreeNwWrapper);

    removeControls(gameInstance);

    $("#game-options-dialog").dialog("open");
}

function generateTreeNwWrapper(event) {
    let nw = event.data.network;
    let gameInstance = event.data.gameInstance;

    let name = $("#nw-name");
    let levels = $("#nw-levels");
    let min = $("#min-children");
    let max = $("#max-children");

    let allFieldsObjects = [];
    allFieldsObjects.push(name);
    allFieldsObjects.push(levels);
    allFieldsObjects.push(min);
    allFieldsObjects.push(max);

    let complete = checkCompleteness(allFieldsObjects);
    let levelsBounds = checkWithinBounds(levels, 2, 7);

    if (complete && levelsBounds) {
        generateTreeNW(nw, name.val(), parseInt(levels.val().trim()), parseInt(min.val().trim()), parseInt(max.val().trim()), gameInstance);
        $("#game-options-dialog").dialog("close");
    }
}

function checkWithinBounds(field, lowerBound, upperBound) {
    let val = parseInt(field.val().trim());
    
    if (!(val <= upperBound && val >= lowerBound)) {
        field.addClass("ui-state-error");
        updateTips("Enter a value between " + lowerBound + " and " + upperBound + ".");
        return false;
    }

    return true;
}

function playGame(event) {
    let loadedData = document.getElementById("file-contents-textarea").value;

    if (loadedData != "" && loadedData != "Error: No file chosen.") {
        loadExistingGame(event.data.network, loadedData, event.data.gameInstance);
        $("#game-options-dialog").dialog("close");
    } else {
        document.getElementById("file-contents-textarea").value = "Error: No file chosen.";
    }

    return null;
}

function loadFileAsText() {
    let fileToLoad = document.getElementById("file-upload").files[0];
    let isJSON = checkJSONFile();

    if (fileToLoad && isJSON) {
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            document.getElementById("file-contents-textarea").value = textFromFileLoaded;
        };

        fileReader.readAsText(fileToLoad, "UTF-8");
    } else if (!fileToLoad) {
        document.getElementById("file-contents-textarea").value = "Error: No file chosen."
    }
}

function encodeGame(event) {
    let progressToSave = JSON.stringify(saveProgress(event.data.network), null,"\t");
    $("#game-progress-textarea").val(progressToSave);
}

function encodePuzzle(event){
    let packetData = generatePolicyPackets(event.data.network, event.data.gameInstance);
    
    if (packetData.length === 0){
        $("#game-puzzle-textarea").val("No configurations found in the network! Could not generate puzzle file."); 
        return;
    }
    
    groomNetwork(event.data.network);
    let puzzleObj = saveProgress(event.data.network, packetData);
    let puzzleJSON = JSON.stringify(puzzleObj, null,"\t");
    $("#game-puzzle-textarea").val(puzzleJSON);    
}

function download(event) {
    let filename = event.data.file;
    let text = $(event.data.textAreaID).val();

    if (text != "") {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    } else {
        $("#game-progress-textarea").val("Please encode game data first");
    }
}

function checkJSONFile() {
    let fileName = document.getElementById("file-upload").value;
    if (fileName == "") {
        document.getElementById("file-contents-textarea").value = "Error: File is not a JSON file.";
        return false;
    } else if (fileName.split(".")[1].toUpperCase() == "JSON")
        return true;
    else {
        document.getElementById("file-contents-textarea").value = "Error: File is not a JSON file.";
        return false;
    }
    return true;
}

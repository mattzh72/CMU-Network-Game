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
        height: 400,
        width: 400,
        title: "Game Configuration",
        close: function () {
            addControls(gameInstance);
        },
    });

    $("label").tooltip();
    $("#game-options-tabs").tabs();


    $("#game-options-load").button({
        icon: "ui-icon-plusthick",
    });
    $("#game-options-load").unbind().click(loadFileAsText);

    $("#game-options-encode-progress").button({
        icon: "ui-icon-transferthick-e-w",
    });
    $("#game-options-encode-progress").unbind().click({
        network: this.nw,
    }, encodeGame);

    $("#game-options-download-progress").button({
        icon: "ui-icon-arrowthickstop-1-s",
    });
    $("#game-options-download-progress").unbind().click({
        file: "puzzle_progress.json",
    }, download);

    $("#game-options-play-game").button({
        icon: "ui-icon-triangle-1-e",
    });
    $("#game-options-play-game").unbind().click({
        network: this.nw,
        gameInstance: this.gameInstance,
    }, playGame);


    removeControls(gameInstance);

    $("#game-options-dialog").dialog("open");
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
    } else if (!fileToLoad){
        document.getElementById("file-contents-textarea").value = "Error: No file chosen."
    }
}

function encodeGame(event) {
//    let progressToSave = JSON.stringify(saveProgress(event.data.network), null,"\t");
//    $("#game-progress-textarea").val(progressToSave);
    let policyFile = JSON.stringify(saveAsPolicy(event.data.network), null, "\t");
//    console.log(policyFile);
    $("#game-progress-textarea").val(policyFile);
}

function download(event) {
    let filename = event.data.file;
    let text = $("#game-progress-textarea").val();

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



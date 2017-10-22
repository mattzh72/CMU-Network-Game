/**
    Loads in all the module .js files in dynamically by inserting script tags in the index.html page
*/
let modules = [
    "camera.js",
    "map.js",
    "dialogue.js",
    "sprite.js",
    "packet.js",
    "stages.js",
    "guide.js",
    "dialogues.js",
    "menu.js",
];

for (let i = 0; i < modules.length; i++){
    let imported = document.createElement('script');
    imported.src = "Modules/" + modules[i];
    document.head.appendChild(imported);
}
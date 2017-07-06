let modules = [
    "player.js",
    "map.js",
    "dialogue.js",
    "sprite.js",
    "packet.js",
    "security.js",
    "guide.js",
];

for (let i = 0; i < modules.length; i++){
    let imported = document.createElement('script');
    imported.src = "Modules/" + modules[i];
    document.head.appendChild(imported);
}
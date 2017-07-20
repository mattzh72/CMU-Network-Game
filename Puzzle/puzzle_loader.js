/**
    Loads in all the puzzle_module .js files in dynamically by inserting script tags in the index.html page
*/
let puzzle_modules = [
    "network.js",
    "network_function.js",
    "network_tester.js",
    "modal.js",
];

for (let i = 0; i < puzzle_modules.length; i++){
    let imported = document.createElement('script');
    imported.src = "Puzzle/" + puzzle_modules[i];
    document.head.appendChild(imported);
}
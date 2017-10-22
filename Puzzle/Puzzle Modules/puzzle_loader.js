/**
    Loads in all the puzzle_module .js files in dynamically by inserting script tags in the index.html page
*/
let puzzle_modules = [
    "Network/network.js",
    "Network/nodes.js",
    "Network/edges.js",
    "Network/router.js",
    "Network/client.js",
    "Network/bfs.js",
    "Functions/nf.js",
    "Functions/ACL.js",
    "Modals/tool_modal.js",
    "Modals/config_modal.js",
    "Modals/function_modal.js",
    "Modals/router_modal.js",
    "Modals/packet_modal.js",
    "Modals/game_options_modal.js",
    "UI/UI.js",
    "Packet/packet.js",
    "Packet/test_packet.js",
    "Packet/generate_policy_packets.js",
    "Loader/saver.js",
    "Loader/generate_new_network.js",
];

for (let i = 0; i < puzzle_modules.length; i++) {
    let imported = document.createElement('script');
    imported.src = "Puzzle/Puzzle%20Modules/" + puzzle_modules[i];
    document.head.appendChild(imported);
}

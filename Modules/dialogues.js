let NATDialogue = [
    "With the NAT, the router acts as an agent between the Internet and a local (private) network. The NAT maps all the IP addresses of a local network (basically everyone on the same wifi) to a public IP address.", 
    
    "That way, outside servers can only see the public IP address, and cannot see the private IP addresses of the devices inside the local network.",

    "For example, the people sitting next to you probably share the same router (wifi) as you. Even though you are using different devices, all of you share the same “public” IP address. But why is this important?",

    "The Internet is getting huge, with more devices being added on everyday. All these devices are capable of sending and receiving information - and in order to do that, each one needs an IP address so that they can be identified.",
    
    "However, IP addresses are running out. If the Internet continues growing at the same pace, soon enough, there will not be enough IP addresses for every internet-enabled device.",

    "NAT helps conserve IP addresses by remapping the IP addresses of a whole group of computers on a network to a single IP address. Additionally, the NAT hides your private IP address - this has security benefits too!",
];

let routingTableDialogue = [
    "Routers use a routing table to decide where packets should go to reach their destination address.",

    "When a packet comes into the router, the router looks at the packet header, and matches the information in the header with an entry in the routing table. This table then has directions for the path the packet should take to reach its destination, and also tells the router where the next stop in this path is (called the next “hop”). ",

    "The reason why a hop is necessary is because often times, there isn’t a straight path to the destination - the packet will have to go to many different places before reaching its final destination.", 
    
    "Think of it like you’re going on a road trip - you can’t drive in a straight line from here to your destination. You’ll make many stops along the way, and the path may be a zig-zag pattern.",

    "Some good terminology to know: Destination - the IP address of the packet's final destination; Next hop - the IP address to which the packet is sent; Metric - assigned to every route possible to measure which route is the best (least costly).",
];

let routingTableSpriteDialogue = ["I'm just here to operate the routing table..."];

let serverDialogue = [
    "A server is computer program that provides some specific service to other computer programs on the network. It’s a special type of computer that’s really good at one kind of task it was designed for. There are four main types of servers: File Server, FTP Server, and Print Server, Web Server.",
    "File Servers sharing and store files in a private network, sometimes on the same computer! For example, your computer probably has a local ‘C’ drive - this is a file server.", 
    "FTP Servers (File Transfer Protocol) are like file servers, but instead, they can be accessed through any kind of network, private or not, and can handle much bigger files across longer distances.", 
    "Print servers are servers that processes documents and sends them to printers for printing.",
    "Web Servers are perhaps the most well-known kind of server. These servers find and deliver the right web pages (and all the files that come with that web page). It often utilizes a DNS, or Domain Name Servers.",
    "A DNS is like a big phone book - they take domain names like “google.com” and translate them to IP addresses.",
];

let clientDialogue = [
    "A client is a computer program that asks another computer program (usually a server) for help. Basically, a client requests a server for help on some task.",
    "There are many different examples of clients. The browser you are running this on is a client, asking a Web Server for help displaying this game. If you use email, your email software (Gmail, Yahoo) is a client asking a Email Server for help sending mail.",
    "There are two types of clients: fat and thin.",
    "Fat clients do a lot of work by themselves, so they don’t need to ask the server for much help in completing their work. An example would be a computer running a CAD-design program (if you’re in robotics, you know what that is).",
    "Thin clients are much more dependent on the server to help them finish their work - these clients don’t do much work themselves, and instead, rely on asking the server to do many tasks.",
    "Your browser is a thin client - it doesn’t do much, and everything it displays is actually from a Web Server.",
    "Advanced Terminology: A fat client will depend on local storage and CPU - thin clients only use their CPU.",
    "Press C to Close.",
];

let proxyDialogue = [
    "I am a proxy."
];

let IDSDialogue = [
    "I am an IDS."
];

let connectionTableDialogue = ["I am an connnection table."];

let ACLScreenDialogue = ["I am an ACL."];
    
let ACLSpriteDialogue = ["I am a stateless firewall."];

let statefulFWSpriteDialogue = ["I am Stateful."];
    


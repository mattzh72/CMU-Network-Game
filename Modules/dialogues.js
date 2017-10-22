let NATDialogue = [
    "With the NAT, the router acts as an agent between the Internet and a local (private) network. The NAT maps all the IP addresses of a local network (basically everyone on the same wifi) to a public IP address.",

    "That way, outside servers can only see the public IP address, and cannot see the private IP addresses of the devices inside the local network.",

    "For example, the people sitting next to you probably share the same router (wifi) as you. Even though you are using different devices, all of you share the same “public” IP address. But why is this important?",

    "The Internet is getting huge, with more devices being added on everyday. All these devices are capable of sending and receiving information - and in order to do that, each one needs an IP address so that they can be identified.",

    "However, IP addresses are running out. If the Internet continues growing at the same pace, soon enough, there will not be enough IP addresses for every internet-enabled device.",

    "NAT helps conserve IP addresses by remapping the IP addresses of a whole group of computers on a network to a single IP address. Additionally, the NAT hides your private IP address - this has security benefits too!",
];

let routingTableDialogue = [
    "Routers use a routing table to decide where packets should go to reach their destination address. One should've popped up just now - you can drag it around and study it.",

    "When a packet comes into the router, the router looks at the packet header, and matches the information in the header with an entry in the routing table.",

    "This table then has directions for the path the packet should take to reach its destination, and also tells the router where the next stop in this path is (called the next “hop”). ",

    "The reason why a hop is necessary is because often times, there isn’t a straight path to the destination - the packet will have to go to many different places before reaching its final destination.",

    "Think of it like you’re going on a road trip - you can’t drive in a straight line from here to your destination. You’ll make many stops along the way, and the path may be a zig-zag pattern.",

    "Some good terminology to know: Destination - the IP address of the packet's final destination; Next hop - the IP address to which the packet is sent; Cost - assigned to every route possible to measure which route is the best (least costly).",
];

let routerDialogue = [
    "A router is a special type of computer whose only job is to decide the best way for data, or a packet, to be sent to its destination.",

    "Routers connect devices - think of them as the “glue” that holds networks together.",

    "How do they do their job? They use something called a “Routing Table”. Click on the above “Routing Table” to learn more.",
];

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
];

let proxyDialogue = [
    "I operate this proxy server. Let me explain to you what it does!",

    "A proxy allows clients to make an indirect connection to a server. What does this mean? Well, a proxy is like a middle man. Here’s how a typical proxy works:",

    "A client will ask the proxy for certain things from a server, say a file. The proxy will go out and ask that server for a file. The server will hand the file to the proxy, and the proxy will hand the file back to the client.",

    "Some proxies are really smart. After giving the file to the client, the proxy might also keep a copy of the file. That way, next time another client asks for the same file, the proxy doesn’t have to go out to the server - it can just give the copy to the client.",

    "A common proxy application is a “caching Web proxy”. It keeps copies of many Web pages so that clients can access websites more quickly and safely.",

    "But because proxies control what clients can receive, proxies are also used by network operators for security purposes. Proxies can refuse to give back certain files.",

    "This way, they can block out things such as inappropriate websites or viruses. Many schools will use proxies to stop students from accessing bad websites!",
];

let IPSDialogue = [
    "I am an IPS, or intrusion prevention device. I keep a copy of the network traffic, which I inspect regularly to look for unusual things.",

    "What things are unusual, you ask? Well, it’s things that I don’t want on my network - whether it be illegal sites, games, or even social media.",

    "I am an extremely, if not the most powerful type of security. I can be arbitrarily programmed with complex behaviors, not just defined by a list of rules like firewalls.",

    "I am programmed usually with many “signatures”, or patterns of network traffic that I should be looking for. There are many detection methods that I can use.",

    "These methods are difficult and complicated, so we don’t need to go into much detail. But I can perform actions like HTTP string/substring matching, generic pattern matching, TCP connection analysis, packet anomaly detection, and much more.",

    "All of the before mentioned actions are ways I can predict if the data in the network is dangerous or not allowed.",

    "If I find that the network flow matches a pattern I was taught, then I can take a variety of actions.",

    "I can take immediate action on the traffic flow and actually alter the network traffic. I can not only drop the packet that I suspect is bad, but I can even block all further traffic coming in from that location.",
];

let connectionTableDialogue = ["I am an connnection table."];

let ACLScreenDialogue = ["I am an ACL."];

let ACLSpriteDialogue = ["I am an ACL, also known as an Access Control List, and I am a basic firewall. You can think of me as a list of rules about which servers the clients can access and which they cannot. I control the network flow!",

"For example, I may be deployed to prevent clients in a network from accessing Facebook servers. I can do this by checking the destination address in data packets flowing through the network, and dropping (or stopping) packets that are going to Facebook servers.",

"I am not a very smart or complex security function because I cannot track active network connections (people call this behavior “stateless”), but I am much faster than the other functions."
];

let statefulFWSpriteDialogue = [
    "I am another type of firewall - a much more advanced type than an ACL. I keep track of network connections and flow, making me a “stateful” security function.",

    "I first check if the traffic packet is allowed in the first place, much like the behavior of an ACL. But after that initial brief check, my behavior becomes more complex.",

    "After my first layer of inspecting the packet, I start inspecting the traffic. Did someone inside the network request this packet? Or is some unknown, perhaps dangerous server send this packet?",

    "I look at how this connection between a client inside my network and a server outside is established, and based my policies, I either let the packet through or drop it.",

    "My connections are stored through something called a “state table”.",

    "This lets me do a lot of complicated things. For example, I can secure a network to only allow data to flow out of a network, but not back in.",

    "For example, if you configure a stateful firewall in your home network, you can configure it so you can freely access any server in the world - but not all servers can access your computer."
];

let packetDialogue = [
    "When computers “talk” (send data) to one another, they send data in packets.",
    
    'For example, if you send an email, the computer will break up the large email into smaller "packets", or smaller chunks of data, and send them separately to the destination. Then, when all the packets are received at the destination, the packets are reassembled so that the entire email can be read.',
    
    "A data packet can be made up of 2 different parts: a header and a payload.",
    
    "The header includes information about the packet. This information is used by other programs to properly process and route this data to the right location (a router can use the header of a packet to decide where to send it).",
    
    "For example, a header could contain information about the type of packet it is. It also contains the source and destination addresses (where the packet is coming from, and where it is heading to). Maybe you’ve heard about these special addresses, which are usually IP addresses.",
    
    "IP addresses are super important - for a computer to communicate with other computers and Web servers on the Internet, it must have an IP address.",
    
    "An IP address (IP stands for Internet Protocol) is a unique 32-bit number that identifies the location of your computer on a network. Basically, it works like your street address -- as a way to find out exactly where you are and deliver information to you.",
    
    "The payload is the content of the data itself. For example, if you wanted to send a message to a friend on facebook, the letters of the message itself would be contained in the payload.",
    
    "To summarize, a packet is a chunk of data. It contains a header, which includes the source and destination of the packet, and also includes a payload, the content of the packet.",
];

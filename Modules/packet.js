let START_X;
let START_Y;
let END_X;
let END_Y;
let packetArr;
let packetDimensions;
let SCALE_FACTOR = 0.2;
let STREAM_DENSITY_FACTOR = 1.5;
let NUM_PCKTS;
let PCKT_SPACING;

function initPacketStream(startX, startY, endX, endY, showDialogue, gameInstance){
    START_X = startX;
    START_Y = startY;
    END_X = endX;
    END_Y = endY;
    packetArr = [];
    
    let dialogue = ["Nothing interesting here"];
    if (showDialogue == true){
        dialogue = ["When computers “talk” (send data) to one another, they send data in packets. A data packet can be made up of 2 different parts: a header and a payload.", "The header includes information about the packet. This information is used by other programs to properly process and route this data to the right location (a router can use the header of a packet to decide where to send it).", "For example, a header could contain information about the type of packet it is. It also contains the source and destination addresses (where the packet is coming from, and where it is heading to). Maybe you’ve heard about these special addresses, which are usually IP addresses.", "IP addresses are super important - for a computer to communicate with other computers and Web servers on the Internet, it must have an IP address.", "An IP address (IP stands for Internet Protocol) is a unique 32-bit number that identifies the location of your computer on a network. Basically, it works like your street address -- as a way to find out exactly where you are and deliver information to you.", "The payload is the content of the data itself. For example, if you wanted to send a message to a friend on facebook, the letters of the message itself would be contained in the payload.","Press C to Close"];
    }
    
    let startPosArrs = calcStartPos(gameInstance);
    
    for (let i = 0; i < startPosArrs.xPosArr.length; i++){
        let packet = addSprite(["Data Packet"], dialogue, 'packet', startPosArrs.xPosArr[i], startPosArrs.yPosArr[i], SCALE_FACTOR, 0, true, gameInstance);
        packetArr.push(packet.instance);
    }
    
//    console.log("STARTING: " + START_X + ", " + START_Y);
//        console.log(packetArr[i].body.x + ", " + packetArr[i].body.y);
//    console.log("ENDING: " + END_X + ", " + END_Y);

}

function calcStartPos(gameInstance){
    let width = gameInstance.cache.getImage('packet').width * SCALE_FACTOR;
    let height = gameInstance.cache.getImage('packet').height * SCALE_FACTOR;
    let xDelta = END_X - START_X; 
    let yDelta = END_Y - START_Y;
    let xDeltaAbs = Math.abs(xDelta);
    let yDeltaAbs = Math.abs(yDelta);
    let slope = yDelta/xDelta; 
    let xPos = [];
    let yPos = [];
        
    if (xDeltaAbs > yDeltaAbs){
        NUM_PCKTS = Math.floor(Math.abs(xDelta/(width * STREAM_DENSITY_FACTOR)));
    }
    else if ( yDeltaAbs > xDeltaAbs ){
        NUM_PCKTS = Math.floor(Math.abs(yDelta/(height * STREAM_DENSITY_FACTOR))); 
    }
    
    PCKT_SPACING = xDelta/NUM_PCKTS;
            
    for (let i = 0; i < NUM_PCKTS; i++){
        let x = START_X + PCKT_SPACING * i;
        xPos.push(x);
        yPos.push(Math.floor(x * slope + findYIntercept(START_X, START_Y, slope)));
    }
    
    let pointsArr = {xPosArr: xPos, yPosArr: yPos};
    return pointsArr;
}

function findYIntercept(x, y, slope){
    return y - slope * x;
}

function updatePacketPos(gameInstance){
    for (let i = 0; i < packetArr.length; i++){
        let currentPacket = packetArr[i];
        let nextPacket = packetArr[(i == packetArr.length - 1) ? 0 : i + 1];

        if ((START_X - END_X) < 0 && currentPacket.body.x > END_X){
            currentPacket.reset(START_X, START_Y);
        }
        
        if ((START_X - END_X) > 0 && currentPacket.body.x < END_X){
            currentPacket.reset(START_X, START_Y);
        }     
        
        if (Phaser.Math.distance(currentPacket.body.x, currentPacket.body.y, nextPacket.body.x, nextPacket.body.y) < Math.abs(PCKT_SPACING)){
            currentPacket.body.velocity.x = 0;
            currentPacket.body.velocity.y = 0;
        }
        else{
            gameInstance.physics.arcade.moveToXY(currentPacket,END_X,END_Y, 100);    
    }
    }
}











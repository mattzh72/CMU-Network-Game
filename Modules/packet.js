const SCALE_FACTOR = 0.1;
const STREAM_DENSITY_FACTOR = 3;
let PACKET_WIDTH;
let PACKET_HEIGHT;

/**
 * Initializes a packet stream.
 * 
 * Calculates the positions of the packets using the start and end points of the stream.
 * Adds packet sprites to those locations
 * 
 * @param {number} startX       - The Y position of the start point
 * @param {number} startY       - The Y position of the start point
 * @param {number} endX         - The X position of the end point
 * @param {number} endY         - The Y position of the end point
 * @param {Boolean} showDialogue - Whether or not to show dialogue for the packet
 * @param {object} gameInstance - A copy of the game variable
 */
function initPacketStream(startX, startY, endX, endY, showDialogue, gameInstance) {
    //Sets and initializes variables
    let packetStreamData = {
        START_X : startX,
        START_Y : startY,
        END_X : endX,
        END_Y : endY,
        packetArr : [],            
    };
    
    PACKET_WIDTH = gameInstance.cache.getImage('packet').width * SCALE_FACTOR;
    PACKET_HEIGHT = gameInstance.cache.getImage('packet').height * SCALE_FACTOR; 

    //Chooses between a short dialogue and the lesson dialogue
    let dialogue = ["Nothing interesting here"];
    if (showDialogue == true) {
        dialogue = [
            "When computers “talk” (send data) to one another, they send data in packets. A data packet can be made up of 2 different parts: a header and a payload.",
            "The header includes information about the packet. This information is used by other programs to properly process and route this data to the right location (a router can use the header of a packet to decide where to send it).",
            "For example, a header could contain information about the type of packet it is. It also contains the source and destination addresses (where the packet is coming from, and where it is heading to). Maybe you’ve heard about these special addresses, which are usually IP addresses.",
            "IP addresses are super important - for a computer to communicate with other computers and Web servers on the Internet, it must have an IP address.",
            "An IP address (IP stands for Internet Protocol) is a unique 32-bit number that identifies the location of your computer on a network. Basically, it works like your street address -- as a way to find out exactly where you are and deliver information to you.",
            "The payload is the content of the data itself. For example, if you wanted to send a message to a friend on facebook, the letters of the message itself would be contained in the payload.",
            "Press C to Close"
        ];
    }

    //Calls internal function calcStartPos() and stores it in an array
    let startPosArrs = calcStartPos(packetStreamData, gameInstance);

    for (let i = 0; i < startPosArrs.xPosArr.length; i++) {
        let packet = addSprite(["Data Packet"], dialogue, 'packet', startPosArrs.xPosArr[i], startPosArrs.yPosArr[i], SCALE_FACTOR, 0, true, gameInstance);
        packetStreamData.packetArr.push(packet.instance);
    }

    for (let i = 0; i < packetStreamData.packetArr.length; i++)
        gameInstance.physics.arcade.moveToXY(packetStreamData.packetArr[i], packetStreamData.END_X, packetStreamData.END_Y, 50);
    
    return packetStreamData;
}

/**
 * Calculates the starting positions of the packets.
 * Decides how many packets needed in stream.
 * Attempts to distribute the packets evenly across a line between the starting and ending points.
 * 
 * @param   {object}   gameInstance - A copy of the game variable
 *                                  
 * @returns {Array} An array of the starting position points
 */
function calcStartPos(packetStreamObj, gameInstance) {
    //xDelta and yDelta are vector components of the packet path
    let xDelta = packetStreamObj.END_X - packetStreamObj.START_X;
    let yDelta = packetStreamObj.END_Y - packetStreamObj.START_Y;

    //The scalar values of xDelta and yDelta
    let xDeltaAbs = Math.abs(xDelta);
    let yDeltaAbs = Math.abs(yDelta);


    let slope = yDelta / xDelta;
    let xPos = [];
    let yPos = [];
    
    //The number of generated packets
    let NUM_PCKTS;

    //Number of packets is decided by dividing the larger scalar value by the product of packet width and a constant 
    if (xDeltaAbs > yDeltaAbs) {
        NUM_PCKTS = Math.floor(xDeltaAbs / (PACKET_WIDTH * STREAM_DENSITY_FACTOR));
    } else if (yDeltaAbs > xDeltaAbs) {
        NUM_PCKTS = Math.floor(yDeltaAbs / (PACKET_HEIGHT * STREAM_DENSITY_FACTOR));
    }

    //The spacing between the x coordinates of the packets 
    let PCKT_SPACING = xDelta / NUM_PCKTS;

    //For all the packets, calculate the x position first, and then the y position
    //Push x positions into array xPos, and y positions into array yPos
    for (let i = 0; i < NUM_PCKTS; i++) {
        let x = packetStreamObj.START_X + PCKT_SPACING * i;
        xPos.push(x);
        yPos.push(Math.floor(x * slope + findYIntercept(packetStreamObj.START_X, packetStreamObj.START_Y, slope)));
    }

    //Construct an object with two properties, each set to the position arrays
    let pointsArr = {
        xPosArr: xPos,
        yPosArr: yPos
    };

    return pointsArr;
}

/**
 * Finds the y intercept of a linear equation given an x , y, and slope values.
 * 
 * @param   {number} x     - A x value in the equation 
 * @param   {number} y     - The y value of the point that has @param x as its x value
 * @param   {number} slope - The slope of the equation
 *                         
 * @returns {number} The y intercept of the linear equation
 */
function findYIntercept(x, y, slope) {
    return y - slope * x;
}

/**
 * Sets the packets in motion and brings the packets back to the start of the stream once they've reached the end.
 * 
 * @param {object} gameInstance - A copy of the game variable
 */
function updatePacketPos(packetStreamObj, gameInstance) {
    for (let i = 0; i < packetStreamObj.packetArr.length; i++) {
        let currentPacket = packetStreamObj.packetArr[i];

        if ((packetStreamObj.START_X - packetStreamObj.END_X) < 0 && currentPacket.body.x > packetStreamObj.END_X) {
            currentPacket.x = packetStreamObj.START_X;
            currentPacket.y = packetStreamObj.START_Y;
            gameInstance.physics.arcade.moveToXY(currentPacket, packetStreamObj.END_X, packetStreamObj.END_Y, 50);
        }

        if ((packetStreamObj.START_X - packetStreamObj.END_X) > 0 && currentPacket.body.x < packetStreamObj.END_X) {
            currentPacket.x = packetStreamObj.START_X;
            currentPacket.y = packetStreamObj.START_Y;
            gameInstance.physics.arcade.moveToXY(currentPacket, packetStreamObj.END_X, packetStreamObj.END_Y, 50);
        }
    }
}

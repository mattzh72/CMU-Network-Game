const SCALE_FACTOR = 0.1;
let STREAM_DENSITY_FACTOR = 2;
let PACKET_WIDTH;
let PACKET_HEIGHT;

let packetStreams = [];

/**
 * Initialize a two way packet stream.
 * @param {number} startX       - The Y position of the start point
 * @param {number} startY       - The Y position of the start point
 * @param {number} endX         - The X position of the end point
 * @param {number} endY         - The Y position of the end point
 * @param {Boolean} showDialogue - Whether or not to show dialogue for the packet
 * @param {object} gameInstance - A copy of the game variable
 */
function initTwoWayPacketStream(startX, startY, endX, endY, density, showDialogue, gameInstance){
    initPacketStream(startX, startY, endX, endY, density, showDialogue, gameInstance);
    initPacketStream(endX, endY, startX, startY, density, showDialogue, gameInstance);
}

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
function initPacketStream(startX, startY, endX, endY, density, showDialogue, gameInstance) {
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
        dialogue = packetDialogue;
    }

    //Calls internal function calcStartPos() and stores it in an array
    let startPosArrs = calcStartPos(packetStreamData, density, gameInstance);

    for (let i = 0; i < startPosArrs.xPosArr.length; i++) {
        let packet = addSprite(["Data Packet"], dialogue, 'packet', startPosArrs.xPosArr[i], startPosArrs.yPosArr[i], SCALE_FACTOR, 0, showDialogue, gameInstance);
        packetStreamData.packetArr.push(packet.instance);
    }

    for (let i = 0; i < packetStreamData.packetArr.length; i++)
        gameInstance.physics.arcade.moveToXY(packetStreamData.packetArr[i], packetStreamData.END_X, packetStreamData.END_Y, 50);
        
    packetStreams.push(packetStreamData);
}

/**
 * Adds a packet with gravity to the game world.
 * @param   {number} x            - The x position to initialize the packet
 * @param   {number} y            - The y position to initialize the packet
 * @param   {string} text         - The dialogue to be shown when packet is clicked on
 * @param   {object} gameInstance - A copy of the game instance
 * @returns {object} Returns addSprite
 */
function addPacket(x, y, text, gameInstance){
    return addSprite(["Data Packet"], text, 'packet', x, y, SCALE_FACTOR, 100, true, gameInstance);
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
function calcStartPos(packetStreamObj, density, gameInstance) {
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
        NUM_PCKTS = Math.floor(xDeltaAbs / (PACKET_WIDTH * density));
    } else if (yDeltaAbs > xDeltaAbs) {
        NUM_PCKTS = Math.floor(yDeltaAbs / (PACKET_HEIGHT * density));
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
 * * @param {object} gameInstance - A copy of the game variable
 */
function updatePacketPositions(gameInstance) {
    for (let i = 0; i < packetStreams.length; i++) {
        for (let c = 0; c < packetStreams[i].packetArr.length; c++){
            let currentPacket = packetStreams[i].packetArr[c];

            if ((packetStreams[i].START_X - packetStreams[i].END_X) < 0 && currentPacket.body.x > packetStreams[i].END_X) {
                currentPacket.x = packetStreams[i].START_X;
                currentPacket.y = packetStreams[i].START_Y;
                gameInstance.physics.arcade.moveToXY(currentPacket, packetStreams[i].END_X, packetStreams[i].END_Y, 50);
            }

            if ((packetStreams[i].START_X - packetStreams[i].END_X) > 0 && currentPacket.body.x < packetStreams[i].END_X) {
                currentPacket.x = packetStreams[i].START_X;
                currentPacket.y = packetStreams[i].START_Y;
                gameInstance.physics.arcade.moveToXY(currentPacket, packetStreams[i].END_X, packetStreams[i].END_Y, 50);
            }
        }
    }
}

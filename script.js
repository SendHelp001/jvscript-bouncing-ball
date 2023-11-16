// Define a variable to store the game piece
var myGamePiece;

// Function to start the game
function startGame() {
    // Create a new game piece with specific properties (width, height, color, position, and type)
    myGamePiece = new component(30, 30, "red", 80, 75, "circle");                 // Ball object initialization
    myGameArea.start();                                                          // Start the game area (canvas) with gravity
}

// Object representing the game area (canvas) and its properties
var myGameArea = {
    canvas: document.createElement("canvas"),                                   // Create a new canvas element
    start: function () {
        this.canvas.width = 1510;                                               // Set the width of the canvas
        this.canvas.height = 270;                                               // Set the height of the canvas
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);   // Insert the canvas into the document body
        this.interval = setInterval(updateGameArea, 20);                        // Set up a timer to update the game area
    },
    stop: function () {
        clearInterval(this.interval);                                           // Stop the game interval
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);    // Clear the canvas
    },
};

// Constructor function to create game components (e.g., the ball)
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.radius = width / 2; // For circular shapes
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0.6;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        if (this.type === "circle") {
            ctx.beginPath();
            ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    };
}

// Function to update the game area (clear, update position, and draw the game piece)
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

// Event listener to handle key presses for WASD controls
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'a':
            myGamePiece.speedX = -5;  // Move left
            break;
        case 'd':
            myGamePiece.speedX = 5;   // Move right
            break;
        case 'w':
            myGamePiece.speedY = -3;  // Move up
            break;
        case 's':
            myGamePiece.speedY = 1;   // Move down
            break;
    }
});

// Event listener to handle key releases and stop the movement
window.addEventListener('keyup', function (e) {
    switch (e.key) {
        case 'a':
        case 'd':
            myGamePiece.speedX = 0;   // Stop horizontal movement
            break;
        case 'w':
        case 's':
            myGamePiece.speedY = 0;   // Stop vertical movement
            break;
    }
});
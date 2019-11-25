var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//rectangles
// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
// ctx.fillRect(300, 300, 100, 400);

//path
// ctx.beginPath();
// ctx.moveTo(50, 350);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "#fa34a3";
// ctx.stroke();

//arc / circle
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'blue';
// ctx.stroke();



// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//     ctx.strokeStyle = 'blue';
//     ctx.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#250063',
    '#0f97d0',
    '#0fc5d0',
    '#3f0063'
];


window.addEventListener('mousemove', 
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log('dadasda')
        // console.log(mouse);
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();

}) 



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            
        
        if (this.radius < maxRadius) {
            this.radius += 1;
        }
    }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    
        this.draw();
    }
}





var circleArray = [];
function init() {
   
    circleArray = [];
    for (var i = 0; i < 1000; i++) {
        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        
        
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerWidth);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


    // console.log('test')
}

init();
animate();





// console.log(canvas);


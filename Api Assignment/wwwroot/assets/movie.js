function get() {
    var searchterm = document.getElementById('input').value;
    fetch(`http://www.omdbapi.com/?t=${searchterm}&apikey=5b085527`)
        .then(response => response.json())
        .then(data => {
            var { Title, Year, Rated, Released, Runtime, Director, Actors,
                Language, Poster, Plot, Genre } = data;
            document.getElementById('moviedetails').innerHTML = `
<div class="movie_card" id="bright">
<div class="info_section">
    <div class="movie_header">
        <img class="locandina"
            src="${Poster}" />
        <h1>${Title}</h1>
        <h4>${Year}, ${Director}</h4>
        <span class="minutes">${Runtime}</span>
        <p class="type">${Genre}</p>
    </div>
    <div class="movie_desc">
        <p class="text">${Plot}</p>
    </div>
    <div class="movie_social">
        <ul>
            <li><i class="material-icons">share</i></li>
            <li><i class="material-icons">🔥</i></li>
            <li><i class="material-icons">#Morpheus</i></li>
        </ul>
    </div>
</div>
<div class="blur_back bright_back" style="background: url(${Poster});"></div>
`;

        });

    // Animation


    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    }());

}


let canvas = document.querySelector(".canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
let ctx = canvas.getContext("2d");
let CirclesArray = [];
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    CirclesArray = [];
    create();
});

window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    CirclesArray[CirclesArray.length - 1].x = mouse.x;
    CirclesArray[CirclesArray.length - 1].y = mouse.y;
    CirclesArray[CirclesArray.length - 1].draw();
});

window.addEventListener("mouseover", function () {
    CirclesArray[CirclesArray.length - 1].dx = 0;
    CirclesArray[CirclesArray.length - 1].dy = 0;
})

function Circles(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ox = dx;
    this.oy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        // bg.color
        ctx.fillStyle = 'Black ';
        // ctx.fillStyle = 'transparent';
    }

    this.update = function () {
        for (let i = 0; i < CirclesArray.length; i++) {
            let circle_distance = Math.hypot(CirclesArray[i].x - this.x, CirclesArray[i].y - this.y) - this.radius;
            if (circle_distance >= -300 && circle_distance < 300) {
                ctx.lineWidth = 1;
                // color
                ctx.strokeStyle = 'rgba(86, 219, 252, ' + (300 - circle_distance) / 300 + ")";
                // ctx.strokeStyle = 'rgba(255, 51, 0,  ' + (300 - circle_distance) / 300 + ")";
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(CirclesArray[i].x, CirclesArray[i].y);
                ctx.stroke();
            }

        }

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
            this.ox = -this.ox;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
            this.oy = -this.oy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function create() {
    for (let i = 0; i < innerWidth / 60; i++) {
        let radius = Math.random() * 2 + 3;
        let x = Math.random() * (innerWidth - 2 * radius) + radius;
        let y = Math.random() * (innerHeight - 2 * radius) + radius;
        let dx = Math.random() * 0.6;
        let dy = Math.random() * 0.6;
        let color = 'rgba(86, 219, 252, ' + (Math.random() * 0.2 + 0.2) + ")";
        // let color = 'rgba(255, 51, 0, 0.5 ' + (Math.random() * 0.2 + 0.2) + ")";
        if (Math.random() >= 0.5) {
            dx = -dx;
        }
        if (Math.random() >= 0.5) {
            dy = -dy;
        }
        CirclesArray.push(new Circles(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < CirclesArray.length; i++) {
        CirclesArray[i].update();
    }
}

animate();
create();

$(window).on('load', function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 1000);
});
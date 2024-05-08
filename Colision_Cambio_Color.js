// Selecciona el elemento canvas del documento HTML 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

// Definición de la clase Circle para representar un círculo
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x; // Posición en el eje x
        this.posY = y; // Posición en el eje y
        this.radius = radius; // Radio del círculo
        this.color = color; // Color del círculo
        this.text = text; // Texto dentro del círculo
        this.speed = speed; // Velocidad de movimiento

        this.dx = Math.random() < 0.5 ? -1 * this.speed : 1 * this.speed; // Desplazamiento en el eje x (dirección aleatoria)
        this.dy = Math.random() < 0.5 ? -1 * this.speed : 1 * this.speed; // Desplazamiento en el eje y (dirección aleatoria)
    }

    // Método para dibujar el círculo en el canvas
    draw(context) {
        context.beginPath();

        // Configura el color y el texto del círculo
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        // Dibuja el círculo con el radio especificado
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    // Método para actualizar la posición del círculo
    update(context, circles) {
        this.draw(context);

        let touching = false; // Variable para indicar si el círculo está tocando otro

        // Verifica los límites del canvas para cambiar la dirección del movimiento
        if ((this.posX + this.radius + this.dx) > window_width || (this.posX - this.radius + this.dx) < 0) {
            this.dx = -this.dx; // Invierte la dirección en el eje x
        }

        if ((this.posY - this.radius + this.dy) < 0 || (this.posY + this.radius + this.dy) > window_height) {
            this.dy = -this.dy; // Invierte la dirección en el eje y
        }

        // Actualiza la posición del círculo según el desplazamiento
        this.posX += this.dx;
        this.posY += this.dy;

        // Verifica si hay colisión con otros círculos
        for (let otherCircle of circles) {
            if (otherCircle !== this && this.isColliding(otherCircle)) {
                touching = true; // Marca que este círculo está tocando otro
            }
        }

        // Cambia el color del círculo según si está tocando otro o no
        this.color = touching ? "red" : "blue";
    }

    // Método para verificar si hay colisión con otro círculo
    isColliding(otherCircle) {
        const dx = this.posX - otherCircle.posX;
        const dy = this.posY - otherCircle.posY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + otherCircle.radius;
    }
}

let circles = [];
const numCircles = 10; // Número de círculos

for (let i = 0; i < numCircles; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);

    let circle = new Circle(randomX, randomY, randomRadius, "blue", (i + 1).toString(), 1);
    circles.push(circle);
}

// Función para dibujar y actualizar todos los círculos
let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);

    // Actualiza y dibuja cada círculo
    for (let circle of circles) {
        circle.update(ctx, circles);
    }
};

updateCircles();

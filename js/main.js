// Selecciona el elemento canvas del DOM
const canvas = document.getElementById("canvas");

// Obtiene el contexto de dibujo en 2D del canvas
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Establece las dimensiones del canvas para que coincidan con las de la ventana
canvas.height = window_height;
canvas.width = window_width;

// Establece el color de fondo del canvas
canvas.style.background = "#ff8";

// Definición de la clase Circle para representar círculos en el canvas
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x; // Posición x del centro del círculo
        this.posY = y; // Posición y del centro del círculo
        this.radius = radius; // Radio del círculo
        this.color = color; // Color del círculo
        this.text = text; // Texto dentro del círculo
        this.speed = speed; // Velocidad de movimiento del círculo

        // Velocidad de movimiento en los ejes x e y
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    // Método para dibujar el círculo en el canvas
    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color; // Establece el color del borde del círculo
        context.textAlign = "center"; // Alinea el texto en el centro horizontalmente
        context.textBaseline = "middle"; // Alinea el texto en el centro verticalmente
        context.font = "20px Arial"; // Establece el tamaño y la fuente del texto
        context.fillText(this.text, this.posX, this.posY); // Dibuja el texto dentro del círculo

        context.lineWidth = 2; // Establece el ancho del borde del círculo
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false); // Dibuja el círculo
        context.stroke(); // Dibuja el borde del círculo
        context.closePath(); // Cierra la ruta del círculo
    }

    // Método para actualizar la posición del círculo y dibujarlo
    update(context) {
        this.draw(context);

        // Verifica los límites del canvas para invertir la dirección del círculo
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0 || (this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        // Actualiza la posición del círculo
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Función para calcular la distancia entre dos puntos
function getDistance(posX1, posY1, posX2, posY2) {
    return Math.sqrt(Math.pow((posX2 - posX1), 2) + Math.pow((posY2 - posY1), 2));
}

// Array de círculos para ser dibujados en el canvas
let circles = [
    new Circle(100, 100, 50, "blue", "1", 3),
    new Circle(250, 150, 20, "blue", "2", 6),
    new Circle(300, 400, 70, "blue", "3", 1),
    new Circle(500, 500, 90, "blue", "4", 9),
    new Circle(390, 150, 40, "blue", "5", 7),
    new Circle(180, 200, 50, "blue", "6", 5),
    new Circle(400, 300, 70, "blue", "7", 3),
    new Circle(222, 340, 100, "blue", "8", 5),
    new Circle(340, 410, 64, "blue", "9", 7),
    new Circle(450, 310, 87, "blue", "10", 9)
];

// Función para actualizar y dibujar los círculos en el canvas
function updateCircles() {
    requestAnimationFrame(updateCircles); // Llama a esta función antes del próximo repintado del canvas
    ctx.clearRect(0, 0, window_width, window_height); // Borra el contenido previo del canvas
    circles.forEach(circle => circle.update(ctx)); // Actualiza y dibuja cada círculo
    checkCollisions(); // Verifica colisiones entre los círculos
}

// Función para verificar colisiones entre los círculos
function checkCollisions() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].color = "blue"; // Restablece todos los círculos a azul antes de verificar las colisiones
        
        for (let j = 0; j < circles.length; j++) {
            if (i !== j) {
                // Si la distancia entre dos círculos es menor que la suma de sus radios, hay colisión
                if (getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY) < (circles[i].radius + circles[j].radius)) {
                    circles[i].color = "blue"; // Cambia el color del primer círculo a azul
                    circles[j].color = "blue"; // Cambia el color del segundo círculo a azul

                    // Calcular la nueva dirección para el primer círculo
                    const dx = circles[i].posX - circles[j].posX;
                    const dy = circles[i].posY - circles[j].posY;
                    const angle = Math.atan2(dy, dx);

                    circles[i].dx = Math.cos(angle) * circles[i].speed;
                    circles[i].dy = Math.sin(angle) * circles[i].speed;

                    // Calcular la nueva dirección para el segundo círculo
                    circles[j].dx = -Math.cos(angle) * circles[j].speed;
                    circles[j].dy = -Math.sin(angle) * circles[j].speed;
                }
            }
        }
    }
}

// Inicia la animación
updateCircles();

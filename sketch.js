// Juego del fantasma
// Haz clic en el fantasma, ¡pero cuidado con la calabaza!

let fantasmaX;
let fantasmaY;
let calabazaX;
let calabazaY;
let puntos = 0;
let tiempo = 30 * 60; // 30 segundos a 60 frames por segundo
let pantalla = 0; // 0 = inicio, 1 = jugando, 2 = fin
let contador = 0;
let contador2 = 0;
let mensaje = "";
let tiempoMensaje = 0;
let estrellasX = [];
let estrellasY = [];

function setup() {
  createCanvas(480, 360);
  nuevoFantasma();
  nuevaCalabaza();

  // guardar posiciones de las estrellas
  for (let i = 0; i < 25; i++) {
    estrellasX[i] = random(0, 480);
    estrellasY[i] = random(0, 360);
  }
}

function draw() {
  background(15, 10, 25);

  // estrellas de fondo
  fill(255, 255, 200);
  noStroke();
  for (let i = 0; i < 25; i++) {
    ellipse(estrellasX[i], estrellasY[i], 2, 2);
  }

  // pantalla de inicio
  if (pantalla == 0) {
    textAlign(CENTER);
    fill(255);
    textSize(22);
    text("Haz clic para comenzar", 240, 170);
    textSize(14);
    text("Atrapa al fantasma, evita la calabaza", 240, 200);
  }

  // jugando
  if (pantalla == 1) {
    tiempo = tiempo - 1;
    contador = contador + 1;
    contador2 = contador2 + 1;

    // el fantasma cambia cada segundo
    if (contador == 60) {
      nuevoFantasma();
      contador = 0;
    }

    // la calabaza cambia cada segundo y medio
    if (contador2 == 90) {
      nuevaCalabaza();
      contador2 = 0;
    }

    // dibujar el fantasma
    noStroke();
    fill(220, 255, 230);
    ellipse(fantasmaX, fantasmaY, 60, 60);
    rect(fantasmaX - 30, fantasmaY, 60, 25);
    // colita ondulada
    ellipse(fantasmaX - 20, fantasmaY + 25, 20, 14);
    ellipse(fantasmaX, fantasmaY + 25, 20, 14);
    ellipse(fantasmaX + 20, fantasmaY + 25, 20, 14);
    // ojos
    fill(20);
    ellipse(fantasmaX - 12, fantasmaY - 5, 10, 10);
    ellipse(fantasmaX + 12, fantasmaY - 5, 10, 10);

    // dibujar la calabaza
    fill(255, 130, 0);
    ellipse(calabazaX, calabazaY, 50, 45);
    fill(40, 120, 40);
    rect(calabazaX - 3, calabazaY - 30, 6, 10);
    fill(20);
    triangle(calabazaX - 14, calabazaY - 4, calabazaX - 4, calabazaY - 4, calabazaX - 9, calabazaY - 14);
    triangle(calabazaX + 4, calabazaY - 4, calabazaX + 14, calabazaY - 4, calabazaX + 9, calabazaY - 14);
    rect(calabazaX - 10, calabazaY + 6, 20, 5);

    // puntos y tiempo
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Puntuación: " + puntos, 12, 25);
    textAlign(RIGHT);
    text("Tiempo: " + ceil(tiempo / 60), 468, 25);

    // mensaje cuando le das a la calabaza
    if (tiempoMensaje > 0) {
      fill(255, 80, 80);
      textAlign(CENTER);
      textSize(20);
      text(mensaje, 240, 340);
      tiempoMensaje = tiempoMensaje - 1;
    }

    // se acabó el tiempo
    if (tiempo <= 0) {
      pantalla = 2;
    }
  }

  // pantalla final
  if (pantalla == 2) {
    textAlign(CENTER);
    fill(255);
    textSize(22);
    text("Fin del juego", 240, 150);
    text("Puntuación: " + puntos, 240, 180);
    text("Haz clic para reintentar", 240, 210);
  }
}

function mousePressed() {
  // empezar o reiniciar
  if (pantalla == 0 || pantalla == 2) {
    pantalla = 1;
    puntos = 0;
    tiempo = 30 * 60;
    contador = 0;
    contador2 = 0;
    tiempoMensaje = 0;
    nuevoFantasma();
    nuevaCalabaza();
  } else if (pantalla == 1) {
    // le diste al fantasma
    let d = dist(mouseX, mouseY, fantasmaX, fantasmaY);
    if (d < 30) {
      puntos = puntos + 1;
      nuevoFantasma();
      contador = 0;
    }

    // le diste a la calabaza
    let d2 = dist(mouseX, mouseY, calabazaX, calabazaY);
    if (d2 < 25) {
      puntos = puntos - 2;
      if (puntos < 0) {
        puntos = 0;
      }
      mensaje = "¡Ay! -2 puntos";
      tiempoMensaje = 40;
      nuevaCalabaza();
      contador2 = 0;
    }
  }
}

function nuevoFantasma() {
  fantasmaX = random(40, 440);
  fantasmaY = random(50, 300);
}

function nuevaCalabaza() {
  calabazaX = random(40, 440);
  calabazaY = random(50, 300);
}
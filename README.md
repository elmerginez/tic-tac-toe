### Descripción del Proyecto
Este es un sencillo juego de Tres en Raya (Tic-Tac-Toe) implementado en HTML, CSS y JavaScript. Los jugadores "X" y "O" se alternan turnos hasta que uno gana o el juego termina en empate. El proyecto incluye una interfaz gráfica básica, funcionalidades para el seguimiento de puntajes y un sistema para reiniciar el juego o restablecer puntajes.

### Estructura del Proyecto
- HTML: Define la estructura básica del juego.

-  `game-container`: Contiene el tablero y las puntuaciones.
-  `game-scores`: Muestra los puntajes de los jugadores "X" y "O", y el número de empates.
-  `game-board`: Representa el tablero de 3x3 donde se juega.
-  `result-modal`: Muestra un modal para reiniciar el juego o indicar el ganador/empate.


- CSS: Proporciona estilos visuales, incluyendo la disposición del tablero y la animación de la línea ganadora.

- Estilos para celdas, botones y el modal.
- Se utiliza `@font-face` para incluir la fuente Rubik.
- `highlight-winner`: Clase que resalta las celdas ganadoras.
- `#winning-line`: Elemento que dibuja una línea sobre las celdas ganadoras.


- JavaScript: Controla la lógica del juego, la interacción del usuario y la actualización visual.

-  Variables de Estado: Maneja el jugador actual, el estado del tablero, puntajes y si el juego sigue en progreso.
-  Funciones Clave:
-    handleClick: Maneja los clics de las celdas, actualizando el turno y revisando si hay un ganador.
-    checkWinner: Verifica los patrones ganadores o si el juego termina en empate.
-    drawWinningLine: Dibuja una línea sobre las celdas ganadoras.
-    resetGame: Reinicia el tablero sin alterar los puntajes.
-    resetAllGame: Reinicia el tablero y los puntajes.


### Archivos:
- index.html: Estructura HTML del juego.
- css/styles.css: Hoja de estilos para personalizar la apariencia.
- js/script.js: Lógica del juego implementada en JavaScript.


### Funcionamiento:
1. Interacción: El jugador hace clic en una celda, su ícono aparece, y el turno se alterna entre "X" y "O".
2. Verificación de Ganador: Después de cada jugada, se verifica si hay un ganador. Si lo hay, las celdas ganadoras se resaltan y se dibuja una línea roja.
3. Reinicio: El botón "REINICIAR" muestra un modal donde el usuario puede confirmar reiniciar el juego incluyendo los puntajes.
/* ============================================================
   teclado.js  -  Controlador de teclado
   ------------------------------------------------------------
   Baseado no teclado.js original do professor. Mantém a mesma
   lógica (teclas pressionadas + disparo único por keydown) e
   apenas acrescenta o preventDefault para as teclas do jogo,
   evitando que a página role ao usar as setas ou o espaço.
   ============================================================ */

// Códigos das teclas utilizadas no jogo
var SETA_ESQUERDA = 37;
var SETA_DIREITA  = 39;
var ESPACO        = 32;

function Teclado(elemento) {
   this.elemento = elemento;

   // Teclas que estão pressionadas neste momento
   this.pressionadas = [];

   // Teclas que já dispararam sua ação (para não repetir no keydown contínuo)
   this.disparadas = [];

   // Funções de disparo registradas por tecla
   this.funcoesDisparo = [];

   // Teclas que não devem rolar a página
   var teclasDoJogo = [SETA_ESQUERDA, SETA_DIREITA, ESPACO];

   var teclado = this;

   elemento.addEventListener('keydown', function(evento) {
      var tecla = evento.keyCode;

      // Evita a rolagem da página ao jogar
      if (teclasDoJogo.indexOf(tecla) !== -1) {
         evento.preventDefault();
      }

      teclado.pressionadas[tecla] = true;

      // Dispara somente no primeiro keydown da tecla (evita "metralhadora")
      if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
         teclado.disparadas[tecla] = true;
         teclado.funcoesDisparo[tecla]();
      }
   });

   elemento.addEventListener('keyup', function(evento) {
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   });
}

Teclado.prototype = {
   // Informa se uma tecla está pressionada agora
   pressionada: function(tecla) {
      return this.pressionadas[tecla];
   },

   // Registra a função a ser executada quando a tecla for pressionada
   disparou: function(tecla, callback) {
      this.funcoesDisparo[tecla] = callback;
   }
};

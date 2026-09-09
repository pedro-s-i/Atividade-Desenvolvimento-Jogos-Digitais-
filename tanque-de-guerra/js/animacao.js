/* ============================================================
   animacao.js  -  Laço de animação (game loop)
   ------------------------------------------------------------
   Baseado no animacao.js original. Mantém a mesma ideia:
   a cada frame limpa a tela, atualiza e desenha todos os
   sprites. Acréscimo: ao final de cada frame remove os sprites
   marcados com "remover = true" (usado pelos projéteis que
   saem da tela), evitando que a lista cresça sem parar.
   ============================================================ */

function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
}

Animacao.prototype = {
   // Adiciona um novo sprite à animação
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },

   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },

   desligar: function() {
      this.ligado = false;
   },

   proximoFrame: function() {
      // Continua apenas se a animação estiver ligada
      if (!this.ligado) return;

      // Limpa a tela antes de desenhar o próximo quadro
      this.limparTela();

      // Atualiza o estado de cada sprite
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      // Desenha cada sprite (na ordem em que foram adicionados)
      for (var i in this.sprites)
         this.sprites[i].desenhar();

      // Limpeza: descarta sprites que se marcaram para remoção
      this.sprites = this.sprites.filter(function(sprite) {
         return !sprite.remover;
      });

      // Agenda o próximo quadro
      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   },

   limparTela: function() {
      var ctx = this.context;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   }
};
